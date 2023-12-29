import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AdminProps } from '../models/admin.model'

export interface AdminsResponseDto extends ResponseWithPaginate {
  admins: AdminProps[]
}
