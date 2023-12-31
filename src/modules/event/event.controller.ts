import { inject, injectable } from 'inversify'
import type { EventControllerModel } from './models/event-controller.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { CreateEventDto } from './dto/create-event.dto'
import type { EventsResponseDto } from './dto/events-response.dto'
import type { UpdateEventDto } from './dto/update-event.dto'
import type { EventModel } from './models/event.model'
import { TOAST_SERVICE_TOKE } from '../shared/toast/toast.di'
import type { ToastServiceModel } from '../shared/toast/toast-service.model'
import type { EventServiceModel } from './models/event-service.model'
import { EVENT_SERVICE_TOKEN } from './event.di'

@injectable()
export class EventController implements EventControllerModel {
  constructor(
    @inject(EVENT_SERVICE_TOKEN) private readonly eventService: EventServiceModel,
    @inject(TOAST_SERVICE_TOKE) private readonly toastService: ToastServiceModel
  ) {}

  async findAll(options: FindAllDto): Promise<EventsResponseDto> {
    const either = await this.eventService.findAll(options)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async findOne(uuid: string): Promise<EventModel> {
    const either = await this.eventService.findOne(uuid)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async create(options: CreateEventDto): Promise<EventModel> {
    const either = await this.eventService.create(options)
    const event = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`creado con exito`)
    return event
  }

  async update(uuid: string, options: UpdateEventDto): Promise<EventModel> {
    const either = await this.eventService.updateOne(uuid, options)
    const event = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`actualizado con exito`)
    return event
  }

  async delete(uuid: string): Promise<EventModel> {
    const either = await this.eventService.removeOne(uuid)
    const event = either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
    this.toastService.emitLog(`eliminado con exito`)
    return event
  }
}
