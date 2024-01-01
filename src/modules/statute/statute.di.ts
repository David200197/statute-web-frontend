import { containerDI } from '../di'
import type { StatuteControllerModel } from './models/statute-controller.model'
import type { StatuteServiceModel } from './models/statute-service.model'
import { StatuteController } from './statute.controller'
import { StatuteService } from './statute.service'

export const STATUTE_SERVICE_TOKEN = Symbol('STATUTE_SERVICE_TOKEN')
export const STATUTE_CONTROLLER_TOKEN = Symbol('STATUTE_CONTROLLER_TOKEN')
containerDI.bind<StatuteServiceModel>(STATUTE_SERVICE_TOKEN).to(StatuteService)
containerDI.bind<StatuteControllerModel>(STATUTE_CONTROLLER_TOKEN).to(StatuteController)
export const statuteController: StatuteControllerModel = containerDI.get(STATUTE_CONTROLLER_TOKEN)
