import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AboutUsProps } from '../models/about-us.model'

export interface AllAboutUsResponseDto extends ResponseWithPaginate {
  allAboutUs: AboutUsProps[]
}
