import isNativeFunction from './isNativeFunction'

if (!isNativeFunction(Object.assign)) {
  /**
   * polyfill es2015 Object.assign
   *
   * @param {Object} target
   * @returns {Object} target
   */
  Object.assign = function assign(target/*, ...args*/) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    let output = Object(target),
        i = -1,
        args = Array.prototype.slice.call(arguments, 1),
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
  }
}

export default Object.assign