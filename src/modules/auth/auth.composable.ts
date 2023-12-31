import { onMounted } from 'vue'
import { authController } from './auth.di'
import type { LoginAuthDto } from './dto/login-auth.dto'
import { useAuthStore } from './auth.store'

type Options = {
  getProfile?: boolean
}

export const useAuth = ({ getProfile = false }: Options = {}) => {
  const authStore = useAuthStore()

  const profile = async () => {
    const admin = await authController.profile()
    authStore.setLoggedAdmin(admin)
  }

  const login = async (loginAuthDto: LoginAuthDto) => {
    await authController.login(loginAuthDto)
    await profile()
  }

  const logout = async () => {
    await authController.logout()
    authStore.cleanLoggedAdmin()
  }

  onMounted(async () => {
    if (!getProfile) return
    await profile()
  })

  return { loggedAdmin: authStore.loggedAdmin, login, logout }
}
