import isNativeFunction from './isNativeFunction'
import toString from './toString'

if (!isNativeFunction(Array.isArray)) {
  /**
   * polyfill es5 Array.isArray
   *
   * @param {Array} arg
   * @returns {Boolean}
   */
  Array.isArray = function isArray(arg) {
    return toString.call(arg) === '[object Array]'
  }
}

export default Array.isArray