import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { StatuteProps } from '../models/statute.model'

export interface StatutesResponseDto extends ResponseWithPaginate {
  statutes: StatuteProps[]
}
