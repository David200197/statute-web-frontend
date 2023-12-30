import { Entity } from '@/common/abstracts/entity.abstract'
import type { SocialNetworkModel, SocialNetworkProps } from '../models/social-network.model'
import type { PropsToValueObjects } from '@/common/interfaces/props-to-value-objects'
import { Uuid } from '@/common/value-object/uuid.value-object'
import { Link } from './value-object/link.value-object'
import { TypeSocialNetwork } from './value-object/type-social-network.value-object'

export class SocialNetwork extends Entity<SocialNetworkProps> implements SocialNetworkModel {
  private constructor(options: PropsToValueObjects<SocialNetworkProps>) {
    super(options)
  }

  public static create(options: SocialNetworkProps): SocialNetwork {
    const uuid = Uuid.create(options.uuid)
    const link = Link.create(options.link)
    const type = TypeSocialNetwork.create(options.type)
    return new SocialNetwork({ uuid, link, type })
  }
}
