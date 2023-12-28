import type { ValueObject } from '../interfaces/value-object'
import validator from 'validator'

export class Uuid implements ValueObject<string> {
  private constructor(public readonly value: string) {}

  public static checkIsUuid(value: string): void {
    if (!validator.isUUID(value)) throw new TypeError('username is not string')
  }

  public static create(value: string): Uuid {
    this.checkIsUuid(value)
    return new Uuid(value)
  }
}
