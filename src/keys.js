import isNativeFunction from './isNativeFunction'
import {hasOwnProperty} from './const'

export default isNativeFunction(Object.keys) ? Object.keys : function () {
  let unableEnumerateOwnKeys, key
  for (key in {toString: 1}) {
    0 // fix rollup bug
    break
  }

  // IE 某些属性即便为自身属性也无法枚举
  key || (unableEnumerateOwnKeys = 'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(' '))

  /**
   * polyfill es5.1 Object.keys
   *
   * @param {Object} object
   * @returns {Object} like {__proto__: *}
   */
  return (Object.keys = function keys (object) {
    let arrkeys = [], key, l, i
    if (unableEnumerateOwnKeys) {
      l = unableEnumerateOwnKeys.length
      i = -1
      while (++i < l) {
        hasOwnProperty.call(object, unableEnumerateOwnKeys[i]) && (arrkeys[l++] = unableEnumerateOwnKeys[i])
      }
    }
    for (key in object) {
      hasOwnProperty.call(object, key) && (arrkeys[l++] = key)
    }
    return arrkeys
  })
}()