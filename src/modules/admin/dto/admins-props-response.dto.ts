import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { AdminProps } from '../models/admin.model'

export interface AdminsPropsResponseDto extends ResponseWithPaginate {
  admins: AdminProps[]
}
