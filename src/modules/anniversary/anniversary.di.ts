import { containerDI } from '../di'
import { AnniversaryService } from './anniversary.service'
import type { AnniversaryServiceModel } from './models/anniversary-service.model'

export const ANNIVERSARY_TOKEN = Symbol('ANNIVERSARY_TOKEN')
containerDI.bind<AnniversaryServiceModel>(ANNIVERSARY_TOKEN).to(AnniversaryService)
export const adminService: AnniversaryServiceModel = containerDI.get(ANNIVERSARY_TOKEN)
