import type { AboutUsServiceModel } from './models/about-us-service.model'
import { AboutUsService } from './about-us.service'
import { containerDI } from '../di'

export const ABOUT_US_TOKEN = Symbol('ABOUT_US_TOKEN')
containerDI.bind<AboutUsServiceModel>(ABOUT_US_TOKEN).to(AboutUsService)
export const aboutUsService: AboutUsServiceModel = containerDI.get(ABOUT_US_TOKEN)
