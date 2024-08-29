import { isLength } from 'validator';

import { ValueObject } from '../base/ValueObject';

export interface ITextConfig {
  min: number;
  max: number;
}

export class Text extends ValueObject<Text, string> {
  static readonly ERROR_INVALID_TEXT = 'ERROR_INVALID_TEXT';

  private constructor(value?: string, config?: ITextConfig) {
    super({ value: (value ?? '').trim(), isNew: value == null });
    this._validate(this._props.value, config);
  }

  static new(value?: string, config?: ITextConfig): Text {
    return new Text(value, config ?? { min: 1, max: 255 });
  }

  static isValid(value = '', config?: ITextConfig): boolean {
    return isLength(value, config);
  }

  private _validate(value?: string, config?: ITextConfig): void {
    const isValid = Text.isValid(value, config);

    if (!isValid) throw new Error(Text.ERROR_INVALID_TEXT);
  }
}
