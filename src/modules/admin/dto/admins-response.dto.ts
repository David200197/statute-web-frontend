import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AdminsModel } from '../models/admins.model'

export interface AdminsResponseDto extends ResponseWithPaginate {
  admins: AdminsModel
}
