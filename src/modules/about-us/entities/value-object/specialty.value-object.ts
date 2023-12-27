export class Specialty {
  private constructor(public readonly value: string) {}

  public static checkIsSpecialty(value: string): void {
    if (typeof value !== 'string') throw new TypeError('specialty is not string')
  }

  public static create(value: string): Specialty {
    this.checkIsSpecialty(value)
    return new Specialty(value)
  }
}
