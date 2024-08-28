import { WithSendProps } from '~components/Control/TextArea';

import { IValues } from './Types';

export const INITIAL_VALUES: IValues = {
  message: '',
};

export const BUTTON_PROPS: WithSendProps['buttonProps'] = {
  type: 'submit',
};
