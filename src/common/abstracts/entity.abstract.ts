import type { DeepPartial } from '../interfaces/deep-partial'
import type { OptionsFlags } from '../interfaces/options-flags'
import type { PropsToValueObjects } from '../interfaces/props-to-value-objects'
import type { ValueObject } from '../interfaces/value-object'
import { isDeeplyEqual } from '../utils/is-deeply-equal'

/**
 * Class representing an Entity.
 * @template Props - Properties.
 */
export interface EntityModel<Props extends Record<string, unknown>>
  extends ValueObject<PropsToValueObjects<Props>> {
  /**
   * Get the properties of the Entity.
   * @returns {string[]} - The array of property names.
   */
  getProperties(): string[]
  /**
   * Get the values of the Entity.
   * @returns {any[]} - The array of property values.
   */
  getValues(): any[]
  /**
   * Get the key-value entries of the Entity.
   * @returns {[string, any][]} - The array of key-value entries.
   */
  getEntries(): [string, any][]
  /**
   * Map the Entity to a new value using a callback function.
   * @param {Function} mutate - The callback function to apply to the Entity.
   * @returns {ReturnType} - The mapped value.
   */
  map<ReturnType>(mutate: (value: Entity<Props>) => ReturnType): ReturnType
  /**
   * Create a shallow clone of the Entity.
   * @returns {Entity} - The cloned Entity.
   */
  clone(): EntityModel<Props>
  /**
   * Perform a method on each property of the Entity.
   * @param {Function} method - The method to apply to each property.
   */
  forEachProperty(method: (key: unknown, value: string) => void): void
  /**
   * Select the properties of the Entity based on a set of options.
   * @param {Partial<OptionsFlags<Props>>} options - The options specifying which properties to select.
   * @returns {Record<string, unknown>} - The selected properties.
   */
  select(options: Partial<OptionsFlags<Props>>): Record<string, unknown>
  /**
   * Ignore the properties of the Entity based on a set of options.
   * @param {Partial<OptionsFlags<Props>>} options - The options specifying which properties to ignore.
   * @returns {Record<string, unknown>} - The ignored properties.
   */
  ignore(options: Partial<OptionsFlags<Props>>): Record<string, unknown>
  /**
   * Determine if the Entity is equal to another Entity.
   * @param {Entity} entity - The Entity to compare.
   * @returns {boolean} - True if the Entities are equal, false otherwise.
   */
  isEqual(entity: this): boolean
  /**
   * Determine if the Entity is equal to a DeepPartial of T.
   * @param {DeepPartial<Props>} entity - The DeepPartial to compare.
   * @returns {boolean} - True if the Entity is equal to the DeepPartial, false otherwise.
   */
  isSelfEqual(entity: DeepPartial<Props>): boolean
  /**
   * Convert the Entity to an object.
   * @returns {Props} - The Entity as an object.
   */
  toObject(): Props
  /**
   * Get the value of a specific property.
   * @param {string} key - The key of the property.
   * @returns {any} - The value of the property.
   */
  get<Prop extends keyof Props>(key: Prop): Props[Prop]
}

export class Entity<Props extends Record<string, unknown>> implements EntityModel<Props> {
  protected constructor(public readonly value: PropsToValueObjects<Props>) {}

  getProperties(): string[] {
    return Object.keys(this.toObject())
  }

  getValues(): any[] {
    return Object.values(this.toObject())
  }

  getEntries(): [string, any][] {
    return Object.entries(this.toObject())
  }

  map<ReturnType>(mutate: (value: Entity<Props>) => ReturnType): ReturnType {
    return mutate(this.clone())
  }

  clone(): Entity<Props> {
    return new Entity(this.value)
  }

  forEachProperty(method: (key: unknown, value: string) => void) {
    const entry = this.getEntries()
    for (const [key, value] of entry) method(key, value)
  }

  select(options: Partial<OptionsFlags<Props>>): Record<string, unknown> {
    const res: Record<string, unknown> = {}
    const object = this.toObject()
    for (const key in options) {
      if (!options[key]) continue
      res[key] = object[key]
    }
    return res
  }

  ignore(options: Partial<OptionsFlags<Props>>): Record<string, unknown> {
    const res: Record<string, unknown> = {}
    const object = this.toObject()
    for (const key in options) {
      if (options[key] !== false) continue
      res[key] = object[key]
    }
    return res
  }

  isEqual(entity: this): boolean {
    return isDeeplyEqual(this.toObject(), entity.toObject())
  }

  isSelfEqual(entity: DeepPartial<Props>): boolean {
    const keys = Object.keys(entity)
    const selects = keys.reduce((prev, currentKey) => ({ ...prev, [currentKey]: true }), {})
    const selected = this.select(selects)
    return isDeeplyEqual(selected, entity)
  }

  toObject(): Props {
    const response: Record<string, unknown> = {}
    for (const key in this.value) {
      response[key] = this.value[key].value
    }
    return response as Props
  }

  get<P extends keyof Props>(key: P): Props[P] {
    return this.value[key].value
  }
}
