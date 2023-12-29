import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AllAboutUsModel } from '../models/all-about-us.model'

export interface AllAboutUsModelResponseDto extends ResponseWithPaginate {
  allAboutUs: AllAboutUsModel
}
