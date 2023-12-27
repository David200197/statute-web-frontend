const getRegExPatterns = (source: any): string => {
  let patterns = ''
  if (source.global) {
    patterns += 'g'
  }
  if (source.ignoreCase) {
    patterns += 'i'
  }
  if (source.multiline) {
    patterns += 'm'
  }
  return patterns
}

/**
 * Clone - JS utility to deep clone an object
 * Supports cloning of:
 * 1. Elementary values
 * 2. Array, Objects (nesting upto any level)
 * 3. Functions
 * 4. Promises
 * 5. Dates
 * 6. Regular expressions
 * 7. Maps & Sets
 *
 * @param {*} obj, object to clone
 * @module clone
 * @exports clone
 */
export const deepClone = (obj: any) => {
  'use strict'
  const clonedObj = {}
  // Takes care of null, undefined
  if (!obj) return obj
  // If obj is elementary (neither Array nor Object)
  if (typeof obj !== 'object') {
    return obj
  }
  // If obj is a date
  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }
  // If obj is an Array
  if (Array.isArray(obj)) {
    const clonedArr: any[] = []
    obj.forEach((item) => {
      clonedArr.push(deepClone(item))
    })
    return clonedArr
  }
  // If obj is a Set
  if (obj.constructor.name.toString() === 'Set') {
    const setToReturn = new Set()
    ;(obj as Set<unknown>).forEach((e) => {
      setToReturn.add(deepClone(e))
    })
    return setToReturn
  }
  // If obj is a Map
  if (obj.constructor.name.toString() === 'Map') {
    const mapToReturn = new Map()
    ;(obj as Map<unknown, unknown>).forEach((value, key) => {
      const newKey = deepClone(key)
      mapToReturn.set(newKey, deepClone(value))
    })
    return mapToReturn
  }
  // If obj is a RegExp
  if (obj.constructor.name.toString() === 'RegExp') {
    const regExToReturn = new RegExp((obj as RegExp).source, getRegExPatterns(obj))
    regExToReturn.lastIndex = (obj as RegExp).lastIndex
    return regExToReturn
  }
  // If obj is a Promise
  if (obj.constructor.name.toString() === 'Promise') {
    const promiseToReturn = new Promise((resolve, reject) => {
      ;(obj as Promise<unknown>).then(
        (res) => {
          resolve(deepClone(res))
        },
        (err) => {
          reject(deepClone(err))
        }
      )
    })
    return promiseToReturn
  }
  // If obj is an Object
  for (const key in obj) {
    ;(clonedObj as any)[key] = deepClone(obj[key])
  }
  return clonedObj
}
