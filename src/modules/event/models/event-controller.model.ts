import type { CreateEventDto } from '../dto/create-event.dto'
import type { EventsResponseDto } from '../dto/events-response.dto'
import type { UpdateEventDto } from '../dto/update-event.dto'
import type { EventModel } from './event.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'

export interface EventControllerModel {
  findOne(uuid: string): Promise<EventModel>
  findAll(options: FindAllDto): Promise<EventsResponseDto>
  create(options: CreateEventDto): Promise<EventModel>
  update(uuid: string, options: UpdateEventDto): Promise<EventModel>
  delete(uuid: string): Promise<EventModel>
}
