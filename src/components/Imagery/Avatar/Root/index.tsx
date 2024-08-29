import { type FC } from 'react';

import classNames from 'classnames';

import defaultAvatar from '~assets/images/default-avatar.png';

import { Image } from '../../Image';
import { type IAvatarRootProps } from './Types';

export const Root: FC<IAvatarRootProps> = ({ url = '#', size }) => {
  return (
    <div
      className={classNames(
        'flex justify-center items-center rounded-full',
        size != null ? `h-${size} w-${size}` : 'size-9',
      )}
    >
      <Image.Root
        src={url}
        alt="avatar"
        className="h-auto w-full object-cover object-center rounded-full"
        defaultSrc={defaultAvatar}
      />
    </div>
  );
};
