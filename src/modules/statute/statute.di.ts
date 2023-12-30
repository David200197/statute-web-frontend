import { containerDI } from '../di'
import type { StatuteServiceModel } from './models/statute-service.model'
import { StatuteService } from './statute.service'

export const STATUTE_TOKEN = Symbol('STATUTE_TOKEN')
containerDI.bind<StatuteServiceModel>(STATUTE_TOKEN).to(StatuteService)
export const statuteService: StatuteServiceModel = containerDI.get(STATUTE_TOKEN)
