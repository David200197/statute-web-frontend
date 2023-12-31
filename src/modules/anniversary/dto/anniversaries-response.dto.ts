import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AnniversariesModel } from '../models/anniversaries.model'

export interface AnniversariesResponseDto extends ResponseWithPaginate {
  anniversaries: AnniversariesModel
}
