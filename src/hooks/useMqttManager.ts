import { useMemo } from 'react';

import { MqttManager } from '~mqttManager';

export const useMqttManager = () => {
  return useMemo(() => MqttManager, []);
};
