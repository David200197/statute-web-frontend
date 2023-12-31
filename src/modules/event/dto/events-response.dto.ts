import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { EventsModel } from '../models/events.model'

export interface EventsResponseDto extends ResponseWithPaginate {
  events: EventsModel
}
