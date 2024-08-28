import { FC, useCallback, useMemo, useRef } from 'react';

import { Message as MessageUI } from '~/components/View/Message';
import { User } from '~/core';
import { Message } from '~core/message';

import { useChat } from '../hooks';

export const Root: FC = () => {
  const { chat, addMessage } = useChat();
  const currentUser = useRef(User.new({ username: 'xama322' }));

  const renderedMessages = useMemo(() => {
    return chat.messages.map((message) =>
      currentUser.current.id.value === message.user.id.value ? (
        <MessageUI.My key={message.id.value} message={message} />
      ) : (
        <MessageUI.Other key={message.id.value} message={message} />
      ),
    );
  }, [chat]);

  const onClickAddMessage = useCallback(() => {
    addMessage(
      Message.new({
        user: { username: 'xama322' },
        sent_at: new Date().toISOString(),
        content: 'what&#39;s preline ui?',
      }),
    );
  }, [addMessage]);

  return (
    <>
      <section className="border rounded-xl shadow-sm p-6 h-160 overflow-y-auto  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <ul className="h-full space-y-5">{renderedMessages}</ul>
      </section>
      <button type="button" onClick={onClickAddMessage}>
        Add message
      </button>
    </>
  );
};
