import { containerDI } from '../di'
import { AnniversaryController } from './anniversary.controller'
import { AnniversaryService } from './anniversary.service'
import type { AnniversaryControllerModel } from './models/anniversary-controller.model'
import type { AnniversaryServiceModel } from './models/anniversary-service.model'

export const ANNIVERSARY_SERVICE_TOKEN = Symbol('ANNIVERSARY_SERVICE_TOKEN')
export const ANNIVERSARY_CONTROLLER_TOKEN = Symbol('ANNIVERSARY_CONTROLLER_TOKEN')
containerDI.bind<AnniversaryServiceModel>(ANNIVERSARY_SERVICE_TOKEN).to(AnniversaryService)
containerDI.bind<AnniversaryControllerModel>(ANNIVERSARY_CONTROLLER_TOKEN).to(AnniversaryController)
export const adminController: AnniversaryControllerModel = containerDI.get(
  ANNIVERSARY_CONTROLLER_TOKEN
)
