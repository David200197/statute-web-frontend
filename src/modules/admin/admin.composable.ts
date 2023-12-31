import type { ComposableFindAllDto } from '@/common/dto/composable-find-all.dto'
import { Admins } from './entities/admins'
import type { AdminsModel } from './models/admins.model'
import { onMounted, ref } from 'vue'
import type { FindAllDto } from '@/common/dto/find-all.dto'
import { Maybe } from '@/common/lib/maybe.lib'
import type { AdminModel } from './models/admin.model'
import { adminController } from './admin.di'
import type { CreateAdminDto } from './dto/create-admin.dto'
import type { UpdateAdminDto } from './dto/update-admin.dto'

export const useAdmin = ({ autoFetch = false, ...dto }: ComposableFindAllDto = {}) => {
  const admins = ref<AdminsModel>(Admins.create([]))
  const totalElement = ref(0)
  const totalPage = ref(0)
  const findAllOptions = ref<FindAllDto>(dto)
  const selectedAdmin = ref<Maybe<AdminModel>>(Maybe.none())

  const selectAdmin = async (uuid: string) => {
    const admin = await adminController.findOne(uuid)
    selectedAdmin.value = Maybe.some(admin)
  }

  const cleanSelectAdmin = () => {
    selectedAdmin.value = Maybe.none()
  }

  const getAdmins = async (options: FindAllDto = {}) => {
    if (options) findAllOptions.value = options
    const response = await adminController.findAll(findAllOptions.value)
    admins.value = response.admins
    totalElement.value = response.totalElement
    totalPage.value = response.totalPage
  }

  const createAdmin = async (options: CreateAdminDto) => {
    await adminController.create(options)
    await getAdmins()
  }

  const updateAdmin = async (username: string, options: UpdateAdminDto) => {
    await adminController.update(username, options)
    await getAdmins()
  }

  const deleteAdmin = async (username: string) => {
    await adminController.delete(username)
    await getAdmins()
  }

  onMounted(async () => {
    if (!autoFetch) return
    await getAdmins()
  })

  return {
    selectedAdmin,
    admins,
    totalElement,
    totalPage,
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    selectAdmin,
    cleanSelectAdmin
  }
}
