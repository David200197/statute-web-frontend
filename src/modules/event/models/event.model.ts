import type { EntityModel } from '@/common/abstracts/entity.abstract'

export type EventProps = {
  readonly uuid: string
  readonly name: string
  readonly date: string
  readonly campus: string
  readonly sponsors: string
  readonly rapporteurship: string
  readonly photos: string[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EventModel extends EntityModel<EventProps> {}
