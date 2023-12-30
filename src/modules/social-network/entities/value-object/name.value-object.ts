export class Name {
  constructor(public readonly value: string) {}

  public static checkIsName(value: string): void {
    if (typeof value !== 'string') throw new TypeError('name is not string')
  }

  public static create(value: string): Name {
    this.checkIsName(value)
    return new Name(value)
  }
}
