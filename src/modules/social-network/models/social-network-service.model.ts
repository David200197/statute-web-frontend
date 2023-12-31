import type { Exception } from '@/common/abstracts/extension.abstract'
import type { Either } from '@/common/lib/either.lib'
import type { SocialNetworkModel } from './social-network.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { SocialNetworksResponseDto } from '../dto/social-networks-response.dto'
import type { CreateSocialNetworkDto } from '../dto/create-social-network.dto'
import type { UpdateSocialNetworkDto } from '../dto/update-social-network.dto'

export interface SocialNetworkServiceModel {
  findOne(uuid: string): Promise<Either<Exception, SocialNetworkModel>>
  findAll(options?: FindAllDto): Promise<Either<Exception, SocialNetworksResponseDto>>
  getAllTypeSocialNetworks(): Promise<Either<Exception, string[]>>
  create(options: CreateSocialNetworkDto): Promise<Either<Exception, SocialNetworkModel>>
  updateOne(
    uuid: string,
    options: UpdateSocialNetworkDto
  ): Promise<Either<Exception, SocialNetworkModel>>
  removeOne(uuid: string): Promise<Either<Exception, SocialNetworkModel>>
}
