import { Maybe } from '@/common/lib/maybe.lib'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AdminModel } from '../admin/models/admin.model'

export const useAuthStore = defineStore('auth', () => {
  const loggedAdmin = ref<Maybe<AdminModel>>(Maybe.none())

  const setLoggedAdmin = (admin: AdminModel) => {
    loggedAdmin.value = Maybe.some(admin)
  }

  const cleanLoggedAdmin = () => {
    Maybe.none()
  }

  return { loggedAdmin, setLoggedAdmin, cleanLoggedAdmin }
})
