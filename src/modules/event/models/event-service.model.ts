import type { Either } from '@/common/lib/either.lib'
import type { CreateEventDto } from '../dto/create-event.dto'
import type { EventsResponseDto } from '../dto/events-response.dto'
import type { UpdateEventDto } from '../dto/update-event.dto'
import type { EventModel } from './event.model'
import type { Exception } from '@/common/abstracts/extension.abstract'
import type { FindAllDto } from '@/common/dto/find-all.dto'

export interface EventServiceModel {
  findOne(uuid: string): Promise<Either<Exception, EventModel>>
  findAll(options: FindAllDto): Promise<Either<Exception, EventsResponseDto>>
  create(options: CreateEventDto): Promise<Either<Exception, EventModel>>
  updateOne(uuid: string, options: UpdateEventDto): Promise<Either<Exception, EventModel>>
  removeOne(uuid: string): Promise<Either<Exception, EventModel>>
}
