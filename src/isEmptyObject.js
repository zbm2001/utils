/**
 * test an object use 'for in'
 *
 * @param {Object} [object]
 * @return {Boolean}
 */
export default function isEmptyObject(object) {
  for (let k in object) {
    return false
  }
  return true
}