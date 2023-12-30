import type { Exception } from '@/common/abstracts/extension.abstract'
import type { Either } from '@/common/lib/either.lib'
import type { CreateEventDto } from './dto/create-event.dto'
import type { EventsModelResponseDto } from './dto/events-model-response.dto'
import type { UpdateEventDto } from './dto/update-event.dto'
import type { EventServiceModel } from './models/event-service.model'
import type { EventModel, EventProps } from './models/event.model'
import { inject, injectable } from 'inversify'
import type { ApiServiceModel } from '../api/api-service.model'
import { API_TOKEN } from '../api/api.di'
import { Event } from './entities/event'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { EventsResponseDto } from './dto/events-response.dto'
import { Events } from './entities/events'

@injectable()
export class EventService implements EventServiceModel {
  constructor(@inject(API_TOKEN) private readonly apiService: ApiServiceModel) {}

  async findOne(uuid: string): Promise<Either<Exception, EventModel>> {
    const event = await this.apiService.get<EventProps>('event', {
      params: [uuid]
    })
    return event.map((data) => Event.create(data))
  }

  async findAll({ order, orderBy, page, perPage }: FindAllDto = {}): Promise<
    Either<Exception, EventsModelResponseDto>
  > {
    const queries: Record<string, string> = {}
    if (order) queries['order'] = order
    if (orderBy) queries['orderBy'] = orderBy
    if (page) queries['page'] = page
    if (perPage) queries['perPage'] = perPage

    const foundedResponse = await this.apiService.get<{
      data: EventsResponseDto
    }>('event', { queries })

    return foundedResponse.map<EventsModelResponseDto>(({ data }) => ({
      events: Events.create(data.events),
      totalElement: data.totalElement,
      totalPage: data.totalPage
    }))
  }

  async create(options: CreateEventDto): Promise<Either<Exception, EventModel>> {
    const formData = new FormData()
    formData.append('name', options.name)
    formData.append('date', options.date)
    formData.append('campus', options.campus)
    formData.append('rapporteurship', options.rapporteurship)
    formData.append('sponsors', options.sponsors)
    for (const photo of options.photos) formData.append('photos', photo, photo.name)
    const event = await this.apiService.post<FormData, EventProps>('event', formData)
    return event.map((data) => Event.create(data))
  }

  async updateOne(uuid: string, options: UpdateEventDto): Promise<Either<Exception, EventModel>> {
    const formData = new FormData()
    if (options?.name) formData.append('name', options.name)
    if (options?.date) formData.append('date', options.date)
    if (options?.campus) formData.append('campus', options.campus)
    if (options?.rapporteurship) formData.append('rapporteurship', options.rapporteurship)
    if (options?.sponsors) formData.append('sponsors', options.sponsors)
    if (options?.photos)
      for (const photo of options.photos) formData.append('photos', photo, photo.name)
    const event = await this.apiService.patch<FormData, EventProps>('event', formData, {
      params: [uuid]
    })
    return event.map((data) => Event.create(data))
  }

  async removeOne(uuid: string): Promise<Either<Exception, EventModel>> {
    const event = await this.apiService.delete<EventProps>('event', {
      params: [uuid]
    })
    return event.map((data) => Event.create(data))
  }
}
