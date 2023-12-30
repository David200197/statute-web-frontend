import { Entities } from '@/common/abstracts/entities.abstracts'
import type { EventModel, EventProps } from '../models/event.model'
import type { EventsModel } from '../models/events.model'
import { Event } from './event'

export class Events extends Entities<EventModel> implements EventsModel {
  private constructor(public readonly value: EventModel[]) {
    super(value)
  }

  static create(value: EventProps[]) {
    if (!Array.isArray(value)) throw new TypeError('Events is not a array')
    return new Events(value.map((data) => Event.create(data)))
  }
}
