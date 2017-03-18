import isArray from './isArray'
import isPlainObject from './isPlainObject'

/**
 * object deep merge
 *
 * @param {Object} target
 * @return {Object} target
 */
export default function merge(target/*, ...args*/) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  for (let l = arguments.length, i = 0; ++i < l;) {
    let overrider = arguments[i]

    if (overrider && overrider !== target) {
      if (isArray(overrider)) {
        mergeArray(target, overrider)
      } else {
        mergeObject(target, overrider)
      }

      function mergeArray(target, overrider){
        for (let n = overrider.length, k = -1; ++k < n;) {
          deepMerge(target, overrider, k)
        }
      }

      function mergeObject(target, overrider){
        for (let k in overrider) {
          deepMerge(target, overrider, k)
        }
      }

      function deepMerge(target, overrider, key) {
        let oValue = overrider[key]
        let tValue = target[key]

        if (oValue && oValue !== tValue && typeof oValue === 'object') {

          if (isArray(oValue)) {
            target[key] = mergeArray(tValue && isArray(tValue) ? tValue : [], oValue)

          } else if (isPlainObject(oValue)) {
            target[key] = mergeObject(tValue && isPlainObject(tValue) ? tValue : {}, oValue)

          } else {
            target[key] = oValue
          }
        } else {
          target[key] = oValue
        }
      }
    }
  }
  return target
}