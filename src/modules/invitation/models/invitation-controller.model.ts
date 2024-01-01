import type { InvitationModel } from './invitation.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { InvitationsResponseDto } from '../dto/invitations-response.dto'
import type { CreateInvitationDto } from '../dto/create-invitation.dto'
import type { UpdateInvitationDto } from '../dto/update-invitation.dto'

export interface InvitationControllerModel {
  findOne(uuid: string): Promise<InvitationModel>
  findAll(options?: FindAllDto): Promise<InvitationsResponseDto>
  create(options: CreateInvitationDto): Promise<InvitationModel>
  update(uuid: string, options: UpdateInvitationDto): Promise<InvitationModel>
  delete(uuid: string): Promise<InvitationModel>
}
