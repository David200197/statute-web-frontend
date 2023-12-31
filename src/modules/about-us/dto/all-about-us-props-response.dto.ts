import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AboutUsProps } from '../models/about-us.model'

export interface AllAboutUsPropsResponseDto extends ResponseWithPaginate {
  allAboutUs: AboutUsProps[]
}
