export interface ToastServiceModel {
  emitError(text: string): void
  emitLog(text: string): void
  emitInfo(text: string): void
}
