import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { SocialNetworksModel } from '../models/social-networks.model'

export interface SocialNetworksModelResponseDto extends ResponseWithPaginate {
  socialNetworks: SocialNetworksModel
}
