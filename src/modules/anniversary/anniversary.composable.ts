import type { ComposableFindAllDto } from '@/common/dto/composable-find-all.dto'
import type { AnniversariesModel } from './models/anniversaries.model'
import { Anniversaries } from './entities/anniversaries'
import { onMounted, ref } from 'vue'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import { Maybe } from '@/common/lib/maybe.lib'
import type { AnniversaryModel } from './models/anniversary.model'
import { anniversaryController } from './anniversary.di'
import type { CreateAnniversaryDto } from './dto/create-anniversary.dto'
import type { UpdateAnniversaryDto } from './dto/update-anniversary.dto'

export const useAnniversary = ({ autoFetch = false, ...dto }: ComposableFindAllDto = {}) => {
  const anniversaries = ref<AnniversariesModel>(Anniversaries.create([]))
  const totalElement = ref(0)
  const totalPage = ref(0)
  const findAllOptions = ref<FindAllDto>(dto)
  const selectedAnniversary = ref<Maybe<AnniversaryModel>>(Maybe.none())

  const selectAnniversary = async (uuid: string) => {
    const anniversary = await anniversaryController.findOne(uuid)
    selectedAnniversary.value = Maybe.some(anniversary)
  }

  const cleanSelectAnniversary = () => {
    selectedAnniversary.value = Maybe.none()
  }

  const getAnniversaries = async (options: FindAllDto = {}) => {
    if (options) findAllOptions.value = options
    const response = await anniversaryController.findAll(findAllOptions.value)
    anniversaries.value = response.anniversaries
    totalElement.value = response.totalElement
    totalPage.value = response.totalPage
  }

  const createAnniversary = async (options: CreateAnniversaryDto) => {
    await anniversaryController.create(options)
    await getAnniversaries()
  }

  const updateAnniversary = async (username: string, options: UpdateAnniversaryDto) => {
    await anniversaryController.update(username, options)
    await getAnniversaries()
  }

  const deleteAnniversary = async (username: string) => {
    await anniversaryController.delete(username)
    await getAnniversaries()
  }

  onMounted(async () => {
    if (!autoFetch) return
    await getAnniversaries()
  })

  return {
    selectedAnniversary,
    anniversaries,
    totalElement,
    totalPage,
    getAnniversaries,
    createAnniversary,
    updateAnniversary,
    deleteAnniversary,
    selectAnniversary,
    cleanSelectAnniversary
  }
}
