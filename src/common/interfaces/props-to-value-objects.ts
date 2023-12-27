import type { ValueObject } from './value-object'

export type PropsToValueObjects<T extends object> = {
  [P in keyof T]: ValueObject<T[P]>
}
