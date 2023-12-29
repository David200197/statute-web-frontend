import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AnniversaryProps } from '../models/anniversary.model'

export interface AnniversariesResponseDto extends ResponseWithPaginate {
  anniversaries: AnniversaryProps[]
}
