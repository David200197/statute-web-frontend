import { Entity } from '@/common/abstracts/entity.abstract'
import type { AboutUsModel, AboutUsProps } from '../models/about-us.model'
import { Uuid } from '@/common/value-object/uuid.value-object'
import { Name } from './value-object/name.value-object'
import { LastName } from './value-object/last-name.value-object'
import { ScientificCategory } from './value-object/scientific-category.value-object'
import { Specialty } from './value-object/specialty.value-object'
import { YearsOfWorkExperience } from './value-object/years-of-work-experience.value-object'
import { TeachingExperience } from './value-object/teaching-experience.value-object'
import { TeachingCategory } from './value-object/teaching-category.value-object'
import { InvestigativeCategory } from './value-object/investigative-category.value-object'
import { SpecialtyDegree } from './value-object/specialty-degree.value-object'
import type { PropsToValueObjects } from '@/common/interfaces/props-to-value-objects'
import type { SelfPartial } from '@/common/interfaces/self-partial'

export class AboutUs extends Entity<AboutUsProps> implements AboutUsModel {
  private constructor(options: PropsToValueObjects<AboutUsProps>) {
    super(options)
  }

  public static create(options: SelfPartial<AboutUsProps, 'uuid'>): AboutUs {
    const uuid = Uuid.create(options.uuid)
    const name = Name.create(options.name)
    const lastName = LastName.create(options.lastName)
    const scientificCategory = ScientificCategory.create(options.scientificCategory)
    const specialty = Specialty.create(options.specialty)
    const yearsOfWorkExperience = YearsOfWorkExperience.create(options.yearsOfWorkExperience)
    const teachingExperience = TeachingExperience.create(options.teachingExperience)
    const teachingCategory = TeachingCategory.create(options.teachingCategory)
    const investigativeCategory = InvestigativeCategory.create(options.investigativeCategory)
    const specialtyDegree = SpecialtyDegree.create(options.specialtyDegree)
    return new AboutUs({
      uuid,
      name,
      lastName,
      scientificCategory,
      specialty,
      yearsOfWorkExperience,
      teachingExperience,
      teachingCategory,
      investigativeCategory,
      specialtyDegree
    })
  }
}
