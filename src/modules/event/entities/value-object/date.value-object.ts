export class DateValue {
  private constructor(public readonly value: string) {}

  public static checkIsDateValue(value: string): void {
    if (typeof value !== 'string') throw new TypeError('date is not string')
  }

  public static create(value: string): DateValue {
    this.checkIsDateValue(value)
    return new DateValue(value)
  }
}
