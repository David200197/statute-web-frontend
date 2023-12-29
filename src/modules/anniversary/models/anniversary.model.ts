import type { EntityModel } from '@/common/abstracts/entity.abstract'

export type AnniversaryProps = {
  readonly uuid: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnniversaryModel extends EntityModel<AnniversaryProps> {}
