export class TeachingExperience {
  private constructor(public readonly value: string) {}

  public static checkIsTeachingExperience(value: string): void {
    if (typeof value !== 'string') throw new TypeError('teachingExperience is not string')
  }

  public static create(value: string): TeachingExperience {
    this.checkIsTeachingExperience(value)
    return new TeachingExperience(value)
  }
}
