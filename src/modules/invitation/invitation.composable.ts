import type { ComposableFindAllDto } from '@/common/dto/composable-find-all.dto'
import type { InvitationsModel } from './models/invitations.model'
import { onMounted, ref } from 'vue'
import { Invitations } from './entities/invitations'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import { Maybe } from '@/common/lib/maybe.lib'
import type { InvitationModel } from './models/invitation.model'
import { invitationController } from './invitation.di'
import type { CreateInvitationDto } from './dto/create-invitation.dto'
import type { UpdateInvitationDto } from './dto/update-invitation.dto'

export const useInvitation = ({ autoFetch = false, ...dto }: ComposableFindAllDto = {}) => {
  const invitations = ref<InvitationsModel>(Invitations.create([]))
  const totalElement = ref(0)
  const totalPage = ref(0)
  const findAllOptions = ref<FindAllDto>(dto)
  const selectedInvitation = ref<Maybe<InvitationModel>>(Maybe.none())

  const selectInvitation = async (uuid: string) => {
    const invitation = await invitationController.findOne(uuid)
    selectedInvitation.value = Maybe.some(invitation)
  }

  const cleanSelectInvitation = () => {
    selectedInvitation.value = Maybe.none()
  }

  const getInvitations = async (options: FindAllDto = {}) => {
    if (options) findAllOptions.value = options
    const response = await invitationController.findAll(findAllOptions.value)
    invitations.value = response.invitations
    totalElement.value = response.totalElement
    totalPage.value = response.totalPage
  }

  const createInvitation = async (options: CreateInvitationDto) => {
    await invitationController.create(options)
    await getInvitations()
  }

  const updateInvitation = async (username: string, options: UpdateInvitationDto) => {
    await invitationController.update(username, options)
    await getInvitations()
  }

  const deleteInvitation = async (username: string) => {
    await invitationController.delete(username)
    await getInvitations()
  }

  onMounted(async () => {
    if (!autoFetch) return
    await getInvitations()
  })

  return {
    selectedInvitation,
    invitations,
    totalElement,
    totalPage,
    getInvitations,
    createInvitation,
    updateInvitation,
    deleteInvitation,
    selectInvitation,
    cleanSelectInvitation
  }
}
