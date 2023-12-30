import { TypeSocialNetworkEnum } from '../models/social-network.model'

export interface CreateSocialNetworkDto {
  readonly link: string
  readonly type: TypeSocialNetworkEnum
}
