import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { StatutesModel } from '../models/statutes.model'

export interface StatutesModelResponseDto extends ResponseWithPaginate {
  statutes: StatutesModel
}
