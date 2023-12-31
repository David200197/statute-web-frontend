import type { AboutUsServiceModel } from './models/about-us-service.model'
import { AboutUsService } from './about-us.service'
import { containerDI } from '../di'
import type { AboutUsControllerModel } from './models/about-us-controller.model'
import { AboutUsController } from './about-us.controller'

export const ABOUT_US_SERVICE_TOKEN = Symbol('ABOUT_US_SERVICE_TOKEN')
export const ABOUT_US_CONTROLLER_TOKEN = Symbol('ABOUT_US_CONTROLLER_TOKEN')
containerDI.bind<AboutUsServiceModel>(ABOUT_US_SERVICE_TOKEN).to(AboutUsService)
containerDI.bind<AboutUsControllerModel>(ABOUT_US_CONTROLLER_TOKEN).to(AboutUsController)
export const aboutUsController: AboutUsControllerModel = containerDI.get(ABOUT_US_CONTROLLER_TOKEN)
