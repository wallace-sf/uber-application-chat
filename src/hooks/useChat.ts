import { useState, useCallback } from 'react';

import { Chat } from '~core/chat';
import { Message } from '~core/message';
import { MqttManager } from '~mqttManager';

export const useChat = () => {
  const [chat, setChat] = useState<Chat>(Chat.new({ messages: [] }));

  const addMessage = useCallback(
    (message: Message, publish = false) => {
      const clone = chat.clone(chat.props);

      clone.add(message);

      if (publish) {
        MqttManager.client?.publish(
          '5d81d305-8c1e-49ff-8905-34fcc2269440',
          JSON.stringify(message.props),
        );
      }

      setChat(clone);
    },
    [chat],
  );

  return { chat, messages: chat.messages, addMessage };
};
