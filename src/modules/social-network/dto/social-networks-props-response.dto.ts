import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { SocialNetworkProps } from '../models/social-network.model'

export interface SocialNetworksPropsResponseDto extends ResponseWithPaginate {
  socialNetworks: SocialNetworkProps[]
}
