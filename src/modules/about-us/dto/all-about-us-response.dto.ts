import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AllAboutUsModel } from '../models/all-about-us.model'

export interface AllAboutUsResponseDto extends ResponseWithPaginate {
  allAboutUs: AllAboutUsModel
}
