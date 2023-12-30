import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { EventProps } from '../models/event.model'

export interface EventsResponseDto extends ResponseWithPaginate {
  events: EventProps[]
}
