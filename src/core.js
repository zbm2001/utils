const AP = Array.prototype
const OP = Object.prototype

export const arrayForEach = AP.forEach
export const arraySlice = AP.slice
export const toString = OP.toString
export const hasOwnProperty = OP.hasOwnProperty

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