import type { OptionsFlags } from '../interfaces/options-flags'
import type { ValueObject } from '../interfaces/value-object'
import type { ValueObjectsToProps } from '../interfaces/value-objects-to-props'
import type { EntityModel } from './entity.abstract'
import { isDeeplyEqual } from '../utils/is-deeply-equal'

/**
 * Class representing an Entities.
 * @template T - Array Properties.
 */
export interface EntitiesModel<Model extends EntityModel<Record<string, unknown>>>
  extends ValueObject<Model[]> {
  readonly value: Model[]
  /**
   * Groups the entities by the provided key
   * @param getKey - A function that returns the key to group by
   * @returns An object with the groups as keys and the entities as values
   */
  groupBy(getKey: (event: Model) => number | string): Record<number | string, Model[]>
  /**
   * Checks if the entities array is empty
   * @returns True if the array is empty, false otherwise
   */
  isEmpty(): boolean
  /**
   * Checks if the entities array is not empty
   * @returns True if the array is not empty, false otherwise
   */
  isNotEmpty(): boolean
  /**
   * Maps over the entities array and applies a function to each element
   * @param method - The method to apply to each element
   * @returns An array with the mapped values
   */
  map<ReturnType>(method: (value: Model, index: number, array: Model[]) => ReturnType): ReturnType[]
  /**
   * Asynchronously maps over the entities array and applies a promise-returning function to each element
   * @param method - The method to apply to each element
   * @returns A promise that resolves to an array with the mapped values
   */
  mapAsync<ReturnType>(
    method: (value: Model, index: number, array: Model[]) => Promise<ReturnType>
  ): Promise<ReturnType[]>
  /**
   * Asynchronously maps over the entities array and applies a function to each element in parallel
   * @param method - The method to apply to each element
   * @returns A promise that resolves to an array of settled promises with the mapped values
   */
  mapParallel<ReturnType>(
    method: (value: Model, index: number, array: Model[]) => ReturnType
  ): Promise<PromiseSettledResult<Awaited<ReturnType>>[]>
  /**
   * Applies a function to each element in the entities array
   * @param method - The method to apply to each element
   */
  forEach(method: (value: Model, index: number, array: Model[]) => void): void
  /**
   * Asynchronously applies a promise-returning function to each element in the entities array
   * @param method - The method to apply to each element
   * @returns A promise that resolves when all iterations are completed
   */
  forEachAsync(
    method: (value: Model, index: number, array: Model[]) => Promise<void>
  ): Promise<void>
  /**
   * Asynchronously maps over the entities array and applies a function to each element in parallel
   * @param method - The method to apply to each element
   * @returns A promise that resolves to an array of settled promises with the mapped values
   */
  forEachParallel(
    method: (value: Model, index: number, array: Model[]) => void
  ): Promise<PromiseSettledResult<void>[]>
  /**
   * Creates a new Entities instance with the same values as the current one
   * @returns A new Entities instance with the same values
   */
  clone(): EntitiesModel<Model>
  /**
   * Returns an array with the values of the entities, applying a select options flags
   * @param options - The select options flags to apply
   * @returns An array with the selected values
   */
  select(options: Partial<OptionsFlags<Model['value']>>): Record<string, unknown>[]
  /**
   * Returns an array with the values of the entities, ignoring properties defined by the ignore options flags
   * @param options - The ignore options flags to apply
   * @returns An array with the ignored values
   */
  ignore(options: Partial<OptionsFlags<Model['value']>>): Record<string, unknown>[]
  /**
   * Checks if two entities arrays are deeply equal
   * @param entities - The entities to compare against
   * @returns True if the arrays are deeply equal, false otherwise
   */
  isEqual(entities: EntitiesModel<Model>): boolean
  /**
   * Adds the entities of another Entities instance to the current one and returns a new Entities instance
   * @param entities - The entities to add
   * @returns A new Entities instance with the entities added
   */
  add(entities: EntitiesModel<Model>): EntitiesModel<Model>
  /**
   * Converts the entities array to an array of objects
   * @returns An array of objects with the values of the entities
   */
  toObject(): ValueObjectsToProps<Model['value']>[]
}

export class Entities<Model extends EntityModel<Record<string, unknown>>>
  implements EntitiesModel<Model>
{
  protected constructor(readonly value: Model[]) {}

  groupBy(getKey: (event: Model) => number | string): Record<number | string, Model[]> {
    return this.value.reduce((accumulator, currentValue) => {
      const key = getKey(currentValue)
      if (!key) return { ...accumulator }
      return {
        ...accumulator,
        [key]: accumulator[key]
          ? new Entities([...accumulator[key].value, currentValue])
          : new Entities([currentValue])
      }
    }, {} as any)
  }

  isEmpty(): boolean {
    return !this.value.length
  }

  isNotEmpty(): boolean {
    return Boolean(this.value.length)
  }

  map<ReturnType>(
    method: (value: Model, index: number, array: Model[]) => ReturnType
  ): ReturnType[] {
    return this.value.map(method)
  }

  async mapAsync<ReturnType>(
    method: (value: Model, index: number, array: Model[]) => Promise<ReturnType>
  ): Promise<ReturnType[]> {
    const newArray: ReturnType[] = []
    const entries = this.value.entries()
    for (const [index, data] of entries) {
      const mutateData = await method(data.clone() as Model, index, this.value)
      newArray[index] = mutateData
    }
    return newArray
  }

  async mapParallel<ReturnType>(
    method: (value: Model, index: number, array: Model[]) => ReturnType
  ): Promise<PromiseSettledResult<Awaited<ReturnType>>[]> {
    return await Promise.allSettled(this.value.map(method))
  }

  forEach(method: (value: Model, index: number, array: Model[]) => void): void {
    return this.value.forEach(method)
  }

  async forEachAsync(
    method: (value: Model, index: number, array: Model[]) => Promise<void>
  ): Promise<void> {
    const entries = this.value.entries()
    for (const [index, data] of entries) {
      await method(data.clone() as Model, index, this.value)
    }
  }

  async forEachParallel(
    method: (value: Model, index: number, array: Model[]) => void
  ): Promise<PromiseSettledResult<void>[]> {
    return await Promise.allSettled(this.value.map(method))
  }

  clone(): Entities<Model> {
    return new Entities([...this.value.map((data) => data.clone())]) as Entities<Model>
  }

  select(options: Partial<OptionsFlags<Model['value']>>): Record<string, unknown>[] {
    return this.value.map((data) => data.select(options))
  }

  ignore(options: Partial<OptionsFlags<Model['value']>>): Record<string, unknown>[] {
    return this.value.map((data) => data.ignore(options))
  }

  isEqual(entities: EntitiesModel<Model>): boolean {
    return isDeeplyEqual(this.value, entities.value)
  }

  add(entities: EntitiesModel<Model>): EntitiesModel<Model> {
    return new Entities([...this.value, ...entities.value])
  }

  toObject(): ValueObjectsToProps<Model['value']>[] {
    return this.value.map((data) => data.toObject()) as ValueObjectsToProps<Model['value']>[]
  }
}
