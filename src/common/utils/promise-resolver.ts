type Resolve<T> = (value: T) => void
type Reject = (reason?: any) => void

export const promiseResolver = <T>() => {
  let resolve: Resolve<T> = () => {}
  let reject: Reject = () => {}
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { resolve, reject, promise }
}
