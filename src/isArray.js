import isNativeFunction from './isNativeFunction'
import {toString} from './const'

/**
 * polyfill es5 Array.isArray
 *
 * @param {Array} arg
 * @returns {Boolean}
 */
export default isNativeFunction(Array.isArray) ? Array.isArray : (Array.isArray = function isArray(arg) {
  return toString.call(arg) === '[object Array]'
})