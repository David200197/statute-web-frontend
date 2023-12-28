import type { CreateAdminDto } from './create-admin.dto'

export interface UpdateAdminDto extends Partial<CreateAdminDto> {
  readonly refreshToken?: string
}
