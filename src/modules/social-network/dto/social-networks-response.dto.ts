import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { SocialNetworksModel } from '../models/social-networks.model'

export interface SocialNetworksResponseDto extends ResponseWithPaginate {
  socialNetworks: SocialNetworksModel
}
