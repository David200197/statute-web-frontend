import { Entities } from '@/common/abstracts/entities.abstracts'
import type { InvitationModel, InvitationProps } from '../models/invitation.model'
import type { InvitationsModel } from '../models/invitations.model'
import { Invitation } from './invitation'

export class Invitations extends Entities<InvitationModel> implements InvitationsModel {
  private constructor(public readonly value: InvitationModel[]) {
    super(value)
  }

  static create(value: InvitationProps[]) {
    if (!Array.isArray(value)) throw new TypeError('Invitations is not a array')
    return new Invitations(value.map((data) => Invitation.create(data)))
  }
}
