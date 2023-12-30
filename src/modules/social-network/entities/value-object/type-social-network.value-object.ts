import { TypeSocialNetworkEnum } from '../../models/social-network.model'

export class TypeSocialNetwork {
  private constructor(public readonly value: TypeSocialNetworkEnum) {}

  public static getAll(): TypeSocialNetworkEnum[] {
    return [
      TypeSocialNetworkEnum.FACEBOOK,
      TypeSocialNetworkEnum.INSTAGRAM,
      TypeSocialNetworkEnum.TELEGRAM,
      TypeSocialNetworkEnum.TWITTER,
      TypeSocialNetworkEnum.WHATSAPP,
      TypeSocialNetworkEnum.X
    ]
  }

  public static checkIsTypeSocialNetwork(value: TypeSocialNetworkEnum): void {
    const allTypeSocialNetwork = this.getAll()
    if (!allTypeSocialNetwork.includes(value)) throw new TypeError('social network is not url')
  }

  public static create(value: TypeSocialNetworkEnum): TypeSocialNetwork {
    this.checkIsTypeSocialNetwork(value)
    return new TypeSocialNetwork(value)
  }
}
