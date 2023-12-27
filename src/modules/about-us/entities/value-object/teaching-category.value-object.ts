import { TeachingCategoryEnum } from '../../models/about-us.model';

export class TeachingCategory {
  private constructor(public readonly value: TeachingCategoryEnum) {}

  public static checkIsTeachingCategory(value: TeachingCategoryEnum): void {
    if (
      value !== TeachingCategoryEnum.assistant &&
      value !== TeachingCategoryEnum.auxiliary &&
      value !== TeachingCategoryEnum.headline
    )
      throw new TypeError('teachingCategory is not string');
  }

  public static create(value: TeachingCategoryEnum): TeachingCategory {
    this.checkIsTeachingCategory(value);
    return new TeachingCategory(value);
  }
}
