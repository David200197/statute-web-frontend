import type { Exception } from '@/common/abstracts/extension.abstract'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { Either } from '@/common/lib/either.lib'
import type { CreateInvitationDto } from './dto/create-invitation.dto'
import type { InvitationsModelResponseDto } from './dto/invitations-model-response.dto'
import type { UpdateInvitationDto } from './dto/update-invitation.dto'
import type { InvitationServiceModel } from './models/invitation-service.model'
import type { InvitationModel, InvitationProps } from './models/invitation.model'
import { inject, injectable } from 'inversify'
import { API_TOKEN } from '../api/api.di'
import type { ApiServiceModel } from '../api/api-service.model'
import { Invitation } from './entities/invitation'
import type { InvitationsResponseDto } from './dto/invitations-response.dto'
import { Invitations } from './entities/invitations'

@injectable()
export class InvitationService implements InvitationServiceModel {
  constructor(@inject(API_TOKEN) private readonly apiService: ApiServiceModel) {}

  async findOne(uuid: string): Promise<Either<Exception, InvitationModel>> {
    const invitation = await this.apiService.get<InvitationProps>('invitation', {
      params: [uuid]
    })
    return invitation.map((data) => Invitation.create(data))
  }

  async findAll({ order, orderBy, page, perPage }: FindAllDto = {}): Promise<
    Either<Exception, InvitationsModelResponseDto>
  > {
    const queries: Record<string, string> = {}
    if (order) queries['order'] = order
    if (orderBy) queries['orderBy'] = orderBy
    if (page) queries['page'] = page
    if (perPage) queries['perPage'] = perPage

    const foundedResponse = await this.apiService.get<{
      data: InvitationsResponseDto
    }>('invitation', { queries })

    return foundedResponse.map<InvitationsModelResponseDto>(({ data }) => ({
      invitations: Invitations.create(data.invitations),
      totalElement: data.totalElement,
      totalPage: data.totalPage
    }))
  }

  async create(options: CreateInvitationDto): Promise<Either<Exception, InvitationModel>> {
    const invitation = await this.apiService.post<CreateInvitationDto, InvitationProps>(
      'invitation',
      options
    )
    return invitation.map((data) => Invitation.create(data))
  }

  async updateOne(
    uuid: string,
    options: UpdateInvitationDto
  ): Promise<Either<Exception, InvitationModel>> {
    const invitation = await this.apiService.patch<CreateInvitationDto, InvitationProps>(
      'invitation',
      options,
      {
        params: [uuid]
      }
    )
    return invitation.map((data) => Invitation.create(data))
  }

  async removeOne(uuid: string): Promise<Either<Exception, InvitationModel>> {
    const invitation = await this.apiService.delete<InvitationProps>('invitation', {
      params: [uuid]
    })
    return invitation.map((data) => Invitation.create(data))
  }
}
