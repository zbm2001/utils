import toString from './toString'
import hasOwnProperty from './hasOwnProperty'
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
 * @param {Object} [obj]
 * @return {Boolean}
 */
export default function isPlainObject(obj) {
  // Must be an Object.
  // Because of IE, we also have to check the presence of the constructor property.
  // Make sure that DOM nodes and window objects don't pass through, as well
  if (!obj || toString.call(obj) !== "[object Object]") return false
  try {
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
      return false;
    }
  } catch (e) {
    // IE8,9 Will throw exceptions on certain host objects
    return false;
  }
  if (!firstTraverseOwnProperty) {
    for (let k in obj) {
      return hasOwnProperty.call(obj, k)
    }
    return true
  }
  for (let k in obj) {}
  return k === undefined || hasOwnProperty.call(obj, k)
}