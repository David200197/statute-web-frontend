import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { SocialNetworkProps } from '../models/social-network.model'

export interface SocialNetworksResponseDto extends ResponseWithPaginate {
  socialNetworks: SocialNetworkProps[]
}
