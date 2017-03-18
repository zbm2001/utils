/**
 * test an object use 'for in'
 *
 * @param {Object} [obj]
 * @return {Boolean}
 */
export default function isEmptyObject(obj) {
  for (let k in obj) {
    return false
  }
  return true
}