import { FC } from 'react';

import { Avatar } from '../../../Imagery/Avatar';
import { MessageRootProps } from '../Types';

export const Other: FC<MessageRootProps> = ({ message }) => {
  return (
    <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11 last-of-type:pb-6">
      <Avatar.Root url="#" />

      <section className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
        <p>
          <span className="text-gray-900 text-sm font-bold">
            {message.user.username.value}
          </span>{' '}
          <span className="text-gray-400">&#8226;</span>{' '}
          <span className="text-gray-400 text-sm">{message.sent_at.hm}</span>
        </p>
        <p className="text-sm !m-0">{message.content.value}</p>
      </section>
    </li>
  );
};
