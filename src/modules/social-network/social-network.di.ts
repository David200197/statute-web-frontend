import { containerDI } from '../di'
import type { SocialNetworkControllerModel } from './models/social-network-controller.model'
import type { SocialNetworkServiceModel } from './models/social-network-service.model'
import { SocialNetworkController } from './social-network.controller'
import { SocialNetworkService } from './social-network.service'

export const SOCIAL_NETWORK_SERVICE_TOKEN = Symbol('SOCIAL_NETWORK_SERVICE_TOKEN')
export const SOCIAL_NETWORK_CONTROLLER_TOKEN = Symbol('SOCIAL_NETWORK_CONTROLLER_TOKEN')
containerDI.bind<SocialNetworkServiceModel>(SOCIAL_NETWORK_SERVICE_TOKEN).to(SocialNetworkService)
containerDI
  .bind<SocialNetworkControllerModel>(SOCIAL_NETWORK_CONTROLLER_TOKEN)
  .to(SocialNetworkController)
export const socialNetworkController: SocialNetworkControllerModel = containerDI.get(
  SOCIAL_NETWORK_CONTROLLER_TOKEN
)
