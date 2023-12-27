import type { EntityModel } from '@/common/abstracts/entity.abstract'

export enum TeachingCategoryEnum {
  assistant = 'asistente',
  auxiliary = 'auxiliar',
  headline = 'titular'
}

export enum InvestigativeCategoryEnum {
  attache = 'agregado',
  auxiliary = 'auxiliar',
  headline = 'titular'
}

export enum SpecialtyDegreeEnum {
  firstDegree = 'primer grado',
  secondDegree = 'segundo grado'
}

export type AboutUsProps = {
  readonly uuid: string
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AboutUsModel extends EntityModel<AboutUsProps> {}
