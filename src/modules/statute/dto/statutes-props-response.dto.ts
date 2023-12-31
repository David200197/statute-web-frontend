import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { StatuteProps } from '../models/statute.model'

export interface StatutesPropsResponseDto extends ResponseWithPaginate {
  statutes: StatuteProps[]
}
