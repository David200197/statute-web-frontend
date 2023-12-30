export class Rapporteurship {
  constructor(public readonly value: string) {}

  public static checkIsRapporteurship(value: string): void {
    if (typeof value !== 'string') throw new TypeError('rapporteurship is not string')
  }

  public static create(value: string): Rapporteurship {
    this.checkIsRapporteurship(value)
    return new Rapporteurship(value)
  }
}
