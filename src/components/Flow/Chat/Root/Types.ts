import { User, Message } from '~/core';

export interface IChatRootProps {
  messages: Message[];
  user: User;
  addMessage: (message: Message, publish: boolean) => void;
}

export interface IValues {
  message: string;
}
