import type { EntityModel } from '@/common/abstracts/entity.abstract'

export type AdminProps = {
  readonly uuid: string
  readonly username: string
  readonly refreshToken?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdminModel extends EntityModel<AdminProps> {}
