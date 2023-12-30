import { containerDI } from '../di'
import type { SocialNetworkServiceModel } from './models/social-network-service.model'
import { SocialNetworkService } from './social-network.service'

export const SOCIAL_NETWORK_TOKEN = Symbol('SOCIAL_NETWORK_TOKEN')
containerDI.bind<SocialNetworkServiceModel>(SOCIAL_NETWORK_TOKEN).to(SocialNetworkService)
export const socialNetworkService: SocialNetworkServiceModel = containerDI.get(SOCIAL_NETWORK_TOKEN)
