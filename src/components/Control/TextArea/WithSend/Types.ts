import { TextAreaProps } from '../Types';

export interface WithSendProps extends TextAreaProps {
  buttonProps: JSX.IntrinsicElements['button'];
}
