import isNativeFunction from './isNativeFunction'
import {arraySlice} from './const'

/**
 * polyfill es2015 Object.assign
 *
 * @param {Object} target
 * @returns {Object} target
 */
export default isNativeFunction(Object.assign) ? Object.assign : (Object.assign = function assign(target/*, ...args*/) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  let output = Object(target),
      i = -1,
      args = arraySlice.call(arguments, 1),
      l = args.length

  while (++i < l) {
    let source = args[i]

    if (source) {
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
          output[prop] = source[prop]
        }
      }
    }
  }
  return output
})