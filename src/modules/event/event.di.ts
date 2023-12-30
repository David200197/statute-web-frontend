import { containerDI } from '../di'
import { EventService } from './event.service'
import type { EventServiceModel } from './models/event-service.model'

export const EVENT_TOKEN = Symbol('EVENT_TOKEN')
containerDI.bind<EventServiceModel>(EVENT_TOKEN).to(EventService)
export const eventService: EventServiceModel = containerDI.get(EVENT_TOKEN)
