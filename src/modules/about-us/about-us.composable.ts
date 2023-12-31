import type { ComposableFindAllDto } from '@/common/dto/composable-find-all.dto'
import { onMounted, ref } from 'vue'
import type { AllAboutUsModel } from './models/all-about-us.model'
import { AllAboutUs } from './entities/all-about-us'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import { aboutUsController } from './about-us.di'
import type { CreateAboutUsDto } from './dto/create-about-us.dto'
import type { UpdateAboutUsDto } from './dto/update-about-us.dto'
import { Maybe } from '@/common/lib/maybe.lib'
import type { AboutUsModel } from './models/about-us.model'

export const useAboutUs = ({ autoFetch = false, ...dto }: ComposableFindAllDto = {}) => {
  const allAboutUs = ref<AllAboutUsModel>(AllAboutUs.create([]))
  const totalElement = ref(0)
  const totalPage = ref(0)
  const findAllOptions = ref<FindAllDto>(dto)
  const selectedAboutUs = ref<Maybe<AboutUsModel>>(Maybe.none())

  const selectAboutUs = async (uuid: string) => {
    const aboutUs = await aboutUsController.findOne(uuid)
    selectedAboutUs.value = Maybe.some(aboutUs)
  }

  const cleanSelectAboutUs = () => {
    selectedAboutUs.value = Maybe.none()
  }

  const getAllAboutUs = async (options: FindAllDto = {}) => {
    if (options) findAllOptions.value = options
    const response = await aboutUsController.findAll(findAllOptions.value)
    allAboutUs.value = response.allAboutUs
    totalElement.value = response.totalElement
    totalPage.value = response.totalPage
  }

  const createAboutUs = async (options: CreateAboutUsDto) => {
    await aboutUsController.create(options)
    await getAllAboutUs()
  }

  const updateAboutUs = async (uuid: string, options: UpdateAboutUsDto) => {
    await aboutUsController.update(uuid, options)
    await getAllAboutUs()
  }

  const deleteAboutUs = async (uuid: string) => {
    await aboutUsController.delete(uuid)
    await getAllAboutUs()
  }

  onMounted(async () => {
    if (!autoFetch) return
    await getAllAboutUs()
  })

  return {
    selectedAboutUs,
    allAboutUs,
    totalElement,
    totalPage,
    getAllAboutUs,
    createAboutUs,
    updateAboutUs,
    deleteAboutUs,
    selectAboutUs,
    cleanSelectAboutUs
  }
}
