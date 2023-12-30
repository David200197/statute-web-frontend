import { containerDI } from '../di'
import { InvitationService } from './invitation.service'
import type { InvitationServiceModel } from './models/invitation-service.model'

export const INVITATION_TOKEN = Symbol('INVITATION_TOKEN')
containerDI.bind<InvitationServiceModel>(INVITATION_TOKEN).to(InvitationService)
export const invitationService: InvitationServiceModel = containerDI.get(INVITATION_TOKEN)
