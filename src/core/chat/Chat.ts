import { IMessageProps, Message } from '../message';
import { Entity, IEntityProps } from '../shared';

export interface IChatProps extends IEntityProps {
  messages: IMessageProps[];
}

export class Chat extends Entity<Chat, IChatProps> {
  public readonly messages: Message[];

  private constructor(props: IChatProps) {
    super(props);
    this.messages = Message.bulk(props.messages);
  }

  static new(props: IChatProps): Chat {
    return new Chat(props);
  }
}
