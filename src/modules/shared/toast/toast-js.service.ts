import 'toastify-js/src/toastify.css'
import Toastify from 'toastify-js'
import type { ToastServiceModel } from './toast-service.model'
import { injectable } from 'inversify'

@injectable()
export class ToastJsService implements ToastServiceModel {
  emitError(text: string): void {
    Toastify({
      text,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'left', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: '#F33737'
      }
    }).showToast()
  }

  emitLog(text: string): void {
    Toastify({
      text,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'left', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: '#41BA43'
      }
    }).showToast()
  }

  emitInfo(text: string): void {
    Toastify({
      text,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'left', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: '#C8CD2C'
      }
    }).showToast()
  }
}
