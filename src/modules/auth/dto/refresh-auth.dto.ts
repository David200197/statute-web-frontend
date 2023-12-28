import type { AdminModel } from '@/modules/admin/models/admin.model'

export interface RefreshAuthDto {
  admin: AdminModel
  refreshToken: string
}
