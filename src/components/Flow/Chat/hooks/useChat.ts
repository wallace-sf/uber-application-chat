import { useState, useCallback } from 'react';

import { Chat } from '~core/chat';
import { Message } from '~core/message';

export const useChat = () => {
  const [chat, setChat] = useState<Chat>(Chat.new({ messages: [] }));

  const addMessage = useCallback(
    (message: Message) => {
      const clone = chat.clone(chat.props);

      clone.add(message);

      setChat(clone);
    },
    [chat],
  );

  return { chat, addMessage };
};
