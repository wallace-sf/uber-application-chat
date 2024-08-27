import { Entity, IEntityProps, Username } from '../shared';

export interface IUserProps extends IEntityProps {
  username: string;
}

export class User extends Entity<User, IUserProps> {
  public readonly username: Username;

  private constructor(props: IUserProps) {
    super(props);
    this.username = Username.new(props.username);
  }

  static new(props: IUserProps): User {
    return new User(props);
  }
}
