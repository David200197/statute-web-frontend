import { containerDI } from '../di'
import { InvitationController } from './invitation.controller'
import { InvitationService } from './invitation.service'
import type { InvitationControllerModel } from './models/invitation-controller.model'
import type { InvitationServiceModel } from './models/invitation-service.model'

export const INVITATION_SERVICE_TOKEN = Symbol('INVITATION_SERVICE_TOKEN')
export const INVITATION_CONTROLLER_TOKEN = Symbol('INVITATION_CONTROLLER_TOKEN')
containerDI.bind<InvitationServiceModel>(INVITATION_SERVICE_TOKEN).to(InvitationService)
containerDI.bind<InvitationControllerModel>(INVITATION_CONTROLLER_TOKEN).to(InvitationController)
export const invitationController: InvitationControllerModel = containerDI.get(
  INVITATION_CONTROLLER_TOKEN
)
