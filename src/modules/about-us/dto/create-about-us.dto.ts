import {
  InvestigativeCategoryEnum,
  SpecialtyDegreeEnum,
  TeachingCategoryEnum
} from '../models/about-us.model'

export interface CreateAboutUsDto {
  readonly name: string
  readonly lastName: string
  readonly scientificCategory: string
  readonly teachingCategory: TeachingCategoryEnum
  readonly investigativeCategory: InvestigativeCategoryEnum
  readonly specialty: string
  readonly specialtyDegree: SpecialtyDegreeEnum
  readonly yearsOfWorkExperience: number
  readonly teachingExperience: string
}
