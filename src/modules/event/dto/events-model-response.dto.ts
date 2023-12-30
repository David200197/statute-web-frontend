import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { EventsModel } from '../models/events.model'

export interface EventsModelResponseDto extends ResponseWithPaginate {
  events: EventsModel
}
