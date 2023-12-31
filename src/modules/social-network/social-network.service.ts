import { inject, injectable } from 'inversify'
import type { SocialNetworkServiceModel } from './models/social-network-service.model'
import type { Exception } from '@/common/abstracts/extension.abstract'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { Either } from '@/common/lib/either.lib'
import type { CreateSocialNetworkDto } from './dto/create-social-network.dto'
import type { SocialNetworksResponseDto } from './dto/social-networks-response.dto'
import type { UpdateSocialNetworkDto } from './dto/update-social-network.dto'
import type { SocialNetworkModel, SocialNetworkProps } from './models/social-network.model'
import { API_TOKEN } from '../api/api.di'
import type { ApiServiceModel } from '../api/api-service.model'
import { SocialNetwork } from './entities/social-network'
import type { SocialNetworksPropsResponseDto } from './dto/social-networks-props-response.dto'
import { SocialNetworks } from './entities/social-networks'

@injectable()
export class SocialNetworkService implements SocialNetworkServiceModel {
  constructor(@inject(API_TOKEN) private readonly apiService: ApiServiceModel) {}

  async findOne(uuid: string): Promise<Either<Exception, SocialNetworkModel>> {
    const invitation = await this.apiService.get<SocialNetworkProps>('social-network', {
      params: [uuid]
    })
    return invitation.map((data) => SocialNetwork.create(data))
  }

  async findAll({ order, orderBy, page, perPage }: FindAllDto = {}): Promise<
    Either<Exception, SocialNetworksResponseDto>
  > {
    const queries: Record<string, string> = {}
    if (order) queries['order'] = order
    if (orderBy) queries['orderBy'] = orderBy
    if (page) queries['page'] = page
    if (perPage) queries['perPage'] = perPage

    const foundedResponse = await this.apiService.get<{
      data: SocialNetworksPropsResponseDto
    }>('social-network', { queries })

    return foundedResponse.map<SocialNetworksResponseDto>(({ data }) => ({
      socialNetworks: SocialNetworks.create(data.socialNetworks),
      totalElement: data.totalElement,
      totalPage: data.totalPage
    }))
  }

  async getAllTypeSocialNetworks(): Promise<Either<Exception, string[]>> {
    const invitation = await this.apiService.get<{ types: string[] }>('social-network', {
      params: ['all-type-social-networks']
    })
    return invitation.map((data) => data.types)
  }

  async create(options: CreateSocialNetworkDto): Promise<Either<Exception, SocialNetworkModel>> {
    const invitation = await this.apiService.post<CreateSocialNetworkDto, SocialNetworkProps>(
      'social-network',
      options
    )
    return invitation.map((data) => SocialNetwork.create(data))
  }

  async updateOne(
    uuid: string,
    options: UpdateSocialNetworkDto
  ): Promise<Either<Exception, SocialNetworkModel>> {
    const invitation = await this.apiService.patch<UpdateSocialNetworkDto, SocialNetworkProps>(
      'social-network',
      options,
      { params: [uuid] }
    )
    return invitation.map((data) => SocialNetwork.create(data))
  }

  async removeOne(uuid: string): Promise<Either<Exception, SocialNetworkModel>> {
    const invitation = await this.apiService.delete<SocialNetworkProps>('social-network', {
      params: [uuid]
    })
    return invitation.map((data) => SocialNetwork.create(data))
  }
}
