import type { ResponseWithPaginate } from '@/common/interfaces/response-with-paginate'
import type { InvitationProps } from '../models/invitation.model'

export interface InvitationsPropsResponseDto extends ResponseWithPaginate {
  invitations: InvitationProps[]
}
