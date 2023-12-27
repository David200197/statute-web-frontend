import type { ValueObject } from './value-object'

export type ValueObjectsToProps<T extends Record<string, ValueObject>> = {
  [P in keyof T]: T[P]['value']
}
