import type { Exception } from '@/common/abstracts/extension.abstract'
import type { Either } from '@/common/lib/either.lib'
import type { InvitationModel } from './invitation.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { InvitationsResponseDto } from '../dto/invitations-response.dto'
import type { CreateInvitationDto } from '../dto/create-invitation.dto'
import type { UpdateInvitationDto } from '../dto/update-invitation.dto'

export interface InvitationServiceModel {
  findOne(uuid: string): Promise<Either<Exception, InvitationModel>>
  findAll(options?: FindAllDto): Promise<Either<Exception, InvitationsResponseDto>>
  create(options: CreateInvitationDto): Promise<Either<Exception, InvitationModel>>
  updateOne(uuid: string, options: UpdateInvitationDto): Promise<Either<Exception, InvitationModel>>
  removeOne(uuid: string): Promise<Either<Exception, InvitationModel>>
}
