import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { StatutesModel } from '../models/statutes.model'

export interface StatutesResponseDto extends ResponseWithPaginate {
  statutes: StatutesModel
}
