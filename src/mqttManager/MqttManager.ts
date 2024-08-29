import * as mqtt from 'mqtt';
import {
  MqttClient,
  IClientSubscribeOptions,
  IClientSubscribeProperties,
  IClientUnsubscribeProperties,
  IClientOptions,
} from 'mqtt';
import { matches } from 'mqtt-pattern';
import invariant from 'tiny-warning';

import { EventBus } from '~events';
import { isValidJson } from '~utils/assertives';

import { ERROR_MESSAGES } from './Constants';
import { isClientConnected } from './Utils';

type Topic = string | string[];
type SubscribeOptions = IClientSubscribeOptions | IClientSubscribeProperties;

export interface MqttManagerProps {
  status:
    | 'connecting'
    | 'connected'
    | 'disconnected'
    | 'reconnecting'
    | 'offline'
    | 'error';
  error: Error | null;
  client: MqttClient | null;
  subscribe(topic: Topic, options: SubscribeOptions): void;
  unsubscribe(topic: Topic, options: IClientUnsubscribeProperties): void;
  onMessageArrived(cb: EventListener): void;
}

class MqttManager implements MqttManagerProps {
  private static _client: MqttClient | null = null;
  private static _instance = new MqttManager();
  private _status: MqttManagerProps['status'] = 'offline';
  private _error: MqttManagerProps['error'] = null;
  private _eventBus = new EventBus();

  constructor() {
    this._setInstance(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this._setStatus = this._setStatus.bind(this);
    this._setError = this._setError.bind(this);
    this.connect = this.connect.bind(this);
  }

  private _setInstance(instance: MqttManager): void {
    if (!MqttManager._instance) {
      MqttManager._instance = instance;
    }
  }

  private _onMessageArrived(subscribeTopic: string | string[]) {
    return (topic: string, message: Buffer) => {
      const payloadString = message.toString();

      if (!isValidJson(payloadString)) {
        invariant(false, ERROR_MESSAGES.INVALID_JSON);
        return;
      }

      const topics = [subscribeTopic].flat();
      const isMatched = topics.some((subTopic) => matches(subTopic, topic));

      if (isMatched) {
        const payload = JSON.parse(message.toString());

        this._eventBus.publish('onMessageArrived', payload);
      }
    };
  }

  private _setStatus(status: MqttManagerProps['status']): void {
    this._status = status;
  }

  private _setError(error: MqttManagerProps['error']): void {
    this._error = error;
  }

  public static getInstance(): Readonly<MqttManager> {
    return MqttManager._instance;
  }

  public static setMqttClient(client: MqttClient): void {
    this._client = client;
  }

  public get client(): MqttClient | null {
    return MqttManager._client;
  }

  public get status(): MqttManagerProps['status'] {
    return this._status;
  }

  public get error(): MqttManagerProps['error'] {
    return this._error;
  }

  public onMessageArrived(cb: EventListener): void {
    this._eventBus.subscribe('onMessageArrived', cb);
  }

  public offMessageArrived(): void {
    this._eventBus.unsubscribe('onMessageArrived');
  }

  public subscribe(topic: Topic, options?: SubscribeOptions): void {
    const client = this.client;

    const isValid = isClientConnected(client);

    if (!isValid) return;

    const topics = [topic].flat();

    client?.subscribe(topics, options);
    client?.on('message', this._onMessageArrived(topic));
  }

  public unsubscribe(
    topic: Topic,
    options?: IClientUnsubscribeProperties,
  ): void {
    const client = this.client;

    const isValid = isClientConnected(client);

    if (!isValid) return;

    const topics = [topic].flat();

    client?.unsubscribe(topics, options);
  }

  public connect(
    brokerUrl: string,
    opts?: IClientOptions,
    cb?: () => void,
  ): void {
    try {
      const mqttInstance = mqtt.default.connect(brokerUrl, opts);

      mqttInstance.on('connect', () => {
        if (this.status !== 'connected') this._setStatus('connected');
        if (cb) cb();
      });

      mqttInstance.on('end', () => {
        if (this.status !== 'disconnected') this._setStatus('disconnected');
        if (this.status !== 'offline') this._setStatus('offline');
      });

      mqttInstance.on('offline', () => {
        if (this.status !== 'offline') this._setStatus('offline');
      });

      mqttInstance.on('error', () => {
        if (this.status !== 'error') this._setStatus('error');
        this._setError(new Error(ERROR_MESSAGES.ERROR_OCURRED));
        invariant(false, ERROR_MESSAGES.ERROR_OCURRED);
      });

      mqttInstance.on('reconnect', () => {
        if (this.status !== 'reconnecting') this._setStatus('reconnecting');
      });

      MqttManager.setMqttClient(mqttInstance);
    } catch (error) {
      this._setStatus('error');
      this._setError(error as Error);
      invariant(false, ERROR_MESSAGES.FAILED_TO_CONNECT);
    }
  }
}

export const Instance = MqttManager.getInstance();
