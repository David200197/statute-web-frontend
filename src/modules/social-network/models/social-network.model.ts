import type { EntityModel } from '@/common/abstracts/entity.abstract'

export enum TypeSocialNetworkEnum {
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  X = 'x',
  INSTAGRAM = 'instagram',
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram'
}

export type SocialNetworkProps = {
  readonly uuid: string
  readonly link: string
  readonly type: TypeSocialNetworkEnum
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SocialNetworkModel extends EntityModel<SocialNetworkProps> {}
