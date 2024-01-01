import type { SocialNetworkModel } from './social-network.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import type { SocialNetworksResponseDto } from '../dto/social-networks-response.dto'
import type { CreateSocialNetworkDto } from '../dto/create-social-network.dto'
import type { UpdateSocialNetworkDto } from '../dto/update-social-network.dto'

export interface SocialNetworkControllerModel {
  findOne(uuid: string): Promise<SocialNetworkModel>
  findAll(options?: FindAllDto): Promise<SocialNetworksResponseDto>
  getAllTypeSocialNetworks(): Promise<string[]>
  create(options: CreateSocialNetworkDto): Promise<SocialNetworkModel>
  update(uuid: string, options: UpdateSocialNetworkDto): Promise<SocialNetworkModel>
  delete(uuid: string): Promise<SocialNetworkModel>
}
