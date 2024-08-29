import { FC } from 'react';

import { Avatar } from '../../../Imagery/Avatar';
import { MessageRootProps } from '../Types';

export const My: FC<MessageRootProps> = ({ message }) => {
  return (
    <li className="flex ms-auto gap-x-2 sm:gap-x-4 last-of-type:pb-6">
      <section className="grow text-end space-y-3">
        <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
          <p>
            <span className="text-white text-sm font-bold">
              {message.user.username.value}
            </span>{' '}
            <span className="text-gray-400">&#8226;</span>{' '}
            <span className="text-gray-400 text-sm">{message.sent_at.hm}</span>
          </p>
          <p className="text-sm text-white">{message.content.value}</p>
        </div>
      </section>
      <Avatar.Root url="#" />
    </li>
  );
};
