import { containerDI } from '../di'
import { EventController } from './event.controller'
import { EventService } from './event.service'
import type { EventControllerModel } from './models/event-controller.model'
import type { EventServiceModel } from './models/event-service.model'

export const EVENT_SERVICE_TOKEN = Symbol('EVENT_SERVICE_TOKEN')
export const EVENT_CONTROLLER_TOKEN = Symbol('EVENT_CONTROLLER_TOKEN')
containerDI.bind<EventServiceModel>(EVENT_SERVICE_TOKEN).to(EventService)
containerDI.bind<EventControllerModel>(EVENT_SERVICE_TOKEN).to(EventController)
export const eventController: EventControllerModel = containerDI.get(EVENT_CONTROLLER_TOKEN)
