import {hasOwnProperty, toString} from './core'
import create from './create'

/**
 * test traverse own property first use "for in" (IE lt 10 return true)
 * @return {Boolean}
 */
const firstTraverseOwnProperty = function () {
  let o = {a: 1}
  let c = create(o)
  c.b = 1
  for (let k in c) {
    return k === 'b'
  }
}()

/**
 * test an object is plain (eg: {} or new Object() created)
 *
 * @param {Object} [object]
 * @return {Boolean}
 */
export default function isPlainObject(object) {
  // Must be an Object.
  // Because of IE, we also have to check the presence of the constructor property.
  // Make sure that DOM nodes and window objects don't pass through, as well
  if (!object || toString.call(object) !== "[object Object]") return false
  try {
    // Not own constructor property must be Object
    if (object.constructor && !hasOwnProperty.call(object, "constructor") && !hasOwnProperty.call(object.constructor.prototype, "isPrototypeOf")) {
      return false;
    }
  } catch (e) {
    // IE8,9 Will throw exceptions on certain host objects
    return false;
  }
  if (!firstTraverseOwnProperty) {
    for (let k in object) {
      return hasOwnProperty.call(object, k)
    }
    return true
  }
  for (let k in object) {}
  return k === undefined || hasOwnProperty.call(object, k)
}