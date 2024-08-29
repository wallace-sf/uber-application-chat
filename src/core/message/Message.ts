import { Entity, IEntityProps, DateTime, Text } from '../shared';
import { type IUserProps, User } from '../user';

export interface IMessageProps extends IEntityProps {
  sent_at?: string;
  user: IUserProps;
  content: string;
}

export class Message extends Entity<Message, IMessageProps> {
  public readonly sent_at: DateTime;
  public readonly user: User;
  public readonly content: Text;

  private constructor(props: IMessageProps) {
    super(props);
    this.sent_at = DateTime.new(props.sent_at);
    this.user = User.new(props.user);
    this.content = Text.new(props.content);
  }

  static new(props: IMessageProps): Message {
    return new Message(props);
  }

  static bulk(messages: IMessageProps[]): Message[] {
    return messages.map(Message.new);
  }
}
