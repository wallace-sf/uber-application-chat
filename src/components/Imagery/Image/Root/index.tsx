import { type FC } from 'react';

import { useEventCallback } from 'usehooks-ts';

import { type ImageRootProps } from './Types';

export const Root: FC<ImageRootProps> = ({ defaultSrc = '', ...props }) => {
  const onError = useEventCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = defaultSrc;
    },
  );

  return (
    <img
      {...props}
      alt={props.alt ?? ''}
      src={props.src == null || props.src === '' ? '#' : props.src}
      onError={onError}
    />
  );
};
