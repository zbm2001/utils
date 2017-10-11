export const global = new Function('return this')()

export const isClient = typeof window === "object" && window === global
export const isServer = !isClient

export const ArrayProto = Array.prototype
export const ObjectProto = Object.prototype

export const arrayForEach = ArrayProto.forEach
export const arraySlice = ArrayProto.slice
export const toString = ObjectProto.toString
export const hasOwnProperty = ObjectProto.hasOwnProperty

export const referenceTypes = {'object': !0, 'function': !0}

export const support__proto__ = '__proto__' in {}

/**
 * function empty, do nothing
 * @return {Undefined}
 */
export function noop () {
}

/**
 * function allways return false
 * @return {Boolean} false
 */
export function returnFalse () {
  return false
}

/**
 * function allways return true
 * @return {Boolean} true
 */
export function returnTrue () {
  return true
}
