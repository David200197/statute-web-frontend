import type { EntityModel } from '@/common/abstracts/entity.abstract'

export type StatuteProps = {
  readonly uuid: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StatuteModel extends EntityModel<StatuteProps> {}
