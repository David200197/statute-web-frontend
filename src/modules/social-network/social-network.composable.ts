import type { ComposableFindAllDto } from '@/common/dto/composable-find-all.dto'
import { onMounted, ref } from 'vue'
import { SocialNetworks } from './entities/social-networks'
import type { SocialNetworksModel } from './models/social-networks.model'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import { Maybe } from '@/common/lib/maybe.lib'
import { socialNetworkController } from './social-network.di'
import type { SocialNetworkModel } from './models/social-network.model'
import type { CreateSocialNetworkDto } from './dto/create-social-network.dto'
import type { UpdateSocialNetworkDto } from './dto/update-social-network.dto'

export const useSocialNetwork = ({ autoFetch = false, ...dto }: ComposableFindAllDto = {}) => {
  const socialNetwork = ref<SocialNetworksModel>(SocialNetworks.create([]))
  const totalElement = ref(0)
  const totalPage = ref(0)
  const findAllOptions = ref<FindAllDto>(dto)
  const selectedSocialNetwork = ref<Maybe<SocialNetworkModel>>(Maybe.none())
  const typeSocialNetworks = ref<string[]>([])

  const selectSocialNetwork = async (uuid: string) => {
    const socialNetwork = await socialNetworkController.findOne(uuid)
    selectedSocialNetwork.value = Maybe.some(socialNetwork)
  }

  const cleanSelectSocialNetwork = () => {
    selectedSocialNetwork.value = Maybe.none()
  }

  const getSocialNetwork = async (options: FindAllDto = {}) => {
    if (options) findAllOptions.value = options
    const response = await socialNetworkController.findAll(findAllOptions.value)
    socialNetwork.value = response.socialNetworks
    totalElement.value = response.totalElement
    totalPage.value = response.totalPage
  }

  const getAllTypes = async () => {
    typeSocialNetworks.value = await socialNetworkController.getAllTypeSocialNetworks()
  }

  const createSocialNetwork = async (options: CreateSocialNetworkDto) => {
    await socialNetworkController.create(options)
    await getSocialNetwork()
  }

  const updateSocialNetwork = async (uuid: string, options: UpdateSocialNetworkDto) => {
    await socialNetworkController.update(uuid, options)
    await getSocialNetwork()
  }

  const deleteSocialNetwork = async (uuid: string) => {
    await socialNetworkController.delete(uuid)
    await getSocialNetwork()
  }

  onMounted(async () => {
    if (!autoFetch) return
    await getSocialNetwork()
  })

  return {
    selectedSocialNetwork,
    socialNetwork,
    totalElement,
    totalPage,
    getSocialNetwork,
    createSocialNetwork,
    updateSocialNetwork,
    deleteSocialNetwork,
    selectSocialNetwork,
    cleanSelectSocialNetwork,
    typeSocialNetworks,
    getAllTypes
  }
}
