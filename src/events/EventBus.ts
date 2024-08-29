import { IEventBusProps } from './Types';

export class EventBus implements IEventBusProps {
  private readonly _eventEmitter: EventTarget;

  constructor() {
    this._eventEmitter = new EventTarget();
    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  public publish<T>(event: string, payload: T): boolean {
    const customEvent = new CustomEvent(event, { detail: payload });
    return this._eventEmitter.dispatchEvent(customEvent);
  }

  public subscribe(
    event: string,
    listener: EventListenerOrEventListenerObject,
  ): void {
    this._eventEmitter.addEventListener(event, listener);
  }

  public unsubscribe(event: string): void {
    this._eventEmitter.removeEventListener(event, null);
  }
}
