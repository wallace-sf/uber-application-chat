import { type ForwardRefRenderFunction, forwardRef } from 'react';

import classNames from 'classnames';

import { Root } from '../Root';
import { WithSendProps } from './Types';

const Component: ForwardRefRenderFunction<
  HTMLTextAreaElement | null,
  WithSendProps
> = ({ buttonProps, ...props }, ref) => {
  return (
    <div className="relative">
      <Root {...props} ref={ref} className="pr-8" />
      <div className="absolute bottom-1.5 right-1.5 p-2 rounded-b-md bg-transparent w-fit">
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-x-1">
            <button
              type="button"
              className={classNames(
                'inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:bg-blue-500',
                buttonProps?.className ?? '',
              )}
              {...buttonProps}
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Component.displayName = 'WithSend';

export const WithSend = forwardRef(Component);
