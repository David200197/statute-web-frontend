import type { EntityModel } from '@/common/abstracts/entity.abstract'

export type InvitationProps = {
  readonly uuid: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InvitationModel extends EntityModel<InvitationProps> {}
