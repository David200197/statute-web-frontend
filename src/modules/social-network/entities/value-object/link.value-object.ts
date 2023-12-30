import validator from 'validator'

export class Link {
  constructor(public readonly value: string) {}

  public static checkIsLink(value: string): void {
    if (!validator.isURL(value)) throw new TypeError('link is not url')
  }

  public static create(value: string): Link {
    this.checkIsLink(value)
    return new Link(value)
  }
}
