import { isAlphanumeric, isLength } from 'validator';

import { ValueObject } from '../base/ValueObject';

export class Username extends ValueObject<Username, string> {
  static readonly ERROR_INVALID_USERNAME = 'ERROR_INVALID_USERNAME';

  private constructor(value?: string) {
    super({ value: value ?? '', isNew: value == null });
    this._validate(this._props.value);
  }

  static new(value?: string): Username {
    return new Username(value);
  }

  static isValid(value = ''): boolean {
    return isAlphanumeric(value) && isLength(value, { min: 3, max: 20 });
  }

  private _validate(value?: string): void {
    const isValid = Username.isValid(value);

    if (!isValid) throw new Error(Username.ERROR_INVALID_USERNAME);
  }
}
