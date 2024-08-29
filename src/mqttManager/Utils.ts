import { MqttClient } from 'mqtt';
import invariant from 'tiny-warning';

import { ERROR_MESSAGES } from './Constants';

export const isClientConnected = (client: MqttClient | null) => {
  const isValid = client?.connected;

  if (!isValid) invariant(false, ERROR_MESSAGES.NOT_CONNECTED);

  return client?.connected ?? false;
};

export const generateMqttClientId = () => {
  const array = new Uint8Array(20);

  window.crypto.getRandomValues(array);

  return Array.from(array, (dec) =>
    ('0' + dec.toString(16)).substring(-2),
  ).join('');
};
