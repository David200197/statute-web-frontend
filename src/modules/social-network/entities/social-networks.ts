import { Entities } from '@/common/abstracts/entities.abstracts'
import type { SocialNetworkModel, SocialNetworkProps } from '../models/social-network.model'
import type { SocialNetworksModel } from '../models/social-networks.model'
import { SocialNetwork } from './social-network'

export class SocialNetworks extends Entities<SocialNetworkModel> implements SocialNetworksModel {
  private constructor(public readonly value: SocialNetworkModel[]) {
    super(value)
  }

  static create(value: SocialNetworkProps[]): SocialNetworks {
    if (!Array.isArray(value)) throw new TypeError('SocialNetworks is not a array')
    return new SocialNetworks(value.map((data) => SocialNetwork.create(data)))
  }
}
