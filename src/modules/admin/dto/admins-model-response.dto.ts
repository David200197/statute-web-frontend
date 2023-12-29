import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AdminsModel } from '../models/admins.model'

export interface AdminsModelResponseDto extends ResponseWithPaginate {
  admins: AdminsModel
}
