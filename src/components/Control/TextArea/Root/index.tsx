import { useMemo, type ForwardRefRenderFunction, forwardRef } from 'react';

import classNames from 'classnames';

import { TextAreaProps } from '../Types';

const Component: ForwardRefRenderFunction<
  HTMLTextAreaElement | null,
  TextAreaProps
> = ({ className, ...props }, ref) => {
  const value = useMemo(() => props.value ?? '', [props.value]);

  const isDisabled = useMemo(
    () => props.disabled != null && props.disabled,
    [props.disabled],
  );

  return (
    <textarea
      aria-disabled={isDisabled}
      aria-placeholder={props.placeholder}
      disabled={isDisabled}
      {...props}
      value={value}
      ref={ref}
      onChange={isDisabled ? undefined : props.onChange}
      onBlur={isDisabled ? undefined : props.onBlur}
      className={classNames(
        'p-4 pb-12 block w-full bg-white border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 outline-0',
        className,
      )}
    />
  );
};

Component.displayName = 'TextArea';

export const Root = forwardRef(Component);
