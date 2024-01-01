import type { ComposableFindAllDto } from '@/common/dto/composable-find-all.dto'
import { onMounted, ref } from 'vue'
import type { StatutesModel } from './models/statutes.model'
import { Statutes } from './entities/statutes'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import { Maybe } from '@/common/lib/maybe.lib'
import type { StatuteModel } from './models/statute.model'
import { statuteController } from './statute.di'
import type { CreateStatuteDto } from './dto/create-statute.dto'
import type { UpdateStatuteDto } from './dto/update-statute.dto'

export const useStatute = ({ autoFetch = false, ...dto }: ComposableFindAllDto = {}) => {
  const statutes = ref<StatutesModel>(Statutes.create([]))
  const totalElement = ref(0)
  const totalPage = ref(0)
  const findAllOptions = ref<FindAllDto>(dto)
  const selectedStatute = ref<Maybe<StatuteModel>>(Maybe.none())

  const selectStatute = async (uuid: string) => {
    const statute = await statuteController.findOne(uuid)
    selectedStatute.value = Maybe.some(statute)
  }

  const cleanSelectStatute = () => {
    selectedStatute.value = Maybe.none()
  }

  const getStatutes = async (options: FindAllDto = {}) => {
    if (options) findAllOptions.value = options
    const response = await statuteController.findAll(findAllOptions.value)
    statutes.value = response.statutes
    totalElement.value = response.totalElement
    totalPage.value = response.totalPage
  }

  const createStatute = async (options: CreateStatuteDto) => {
    await statuteController.create(options)
    await getStatutes()
  }

  const updateStatute = async (uuid: string, options: UpdateStatuteDto) => {
    await statuteController.update(uuid, options)
    await getStatutes()
  }

  const deleteStatute = async (uuid: string) => {
    await statuteController.delete(uuid)
    await getStatutes()
  }

  onMounted(async () => {
    if (!autoFetch) return
    await getStatutes()
  })

  return {
    selectedStatute,
    statutes,
    totalElement,
    totalPage,
    getStatutes,
    createStatute,
    updateStatute,
    deleteStatute,
    selectStatute,
    cleanSelectStatute
  }
}
