import { inject, injectable } from 'inversify'
import type { AdminModel } from '../admin/models/admin.model'
import type { LoginAuthResponseDto } from './dto/login-auth-response.dto'
import type { LoginAuthDto } from './dto/login-auth.dto'
import type { RefreshAuthResponseDto } from './dto/refresh-auth-response.dto'
import type { AuthControllerModel } from './models/auth-controller.model'
import { ADMIN_SERVICE_TOKEN } from '../admin/admin.di'
import { TOAST_SERVICE_TOKE } from '../shared/toast/toast.di'
import type { AuthServiceModel } from './models/auth-service.model'
import type { ToastServiceModel } from '../shared/toast/toast-service.model'

@injectable()
export class AuthController implements AuthControllerModel {
  constructor(
    @inject(ADMIN_SERVICE_TOKEN) private readonly authService: AuthServiceModel,
    @inject(TOAST_SERVICE_TOKE) private readonly toastService: ToastServiceModel
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<LoginAuthResponseDto> {
    const either = await this.authService.login(loginAuthDto)
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async logout(): Promise<void> {
    const either = await this.authService.logout()
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async refresh(): Promise<RefreshAuthResponseDto> {
    const either = await this.authService.refresh()
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }

  async profile(): Promise<AdminModel> {
    const either = await this.authService.profile()
    return either.fold(
      (exception) => {
        this.toastService.emitError(exception.message)
        throw exception
      },
      (value) => value
    )
  }
}
