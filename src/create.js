import isNativeFunction from './isNativeFunction'
import hasOwnProperty from './hasOwnProperty'
import referenceTypes from './referenceTypes'

if (!isNativeFunction(Object.create)) {
  /**
   * polyfill es5 Object.create
   *
   * @param {Object} object
   * @param {Object} props
   * @returns {Object} like {__proto__: *}
   */
  Object.create = function create(object, props) {
    if (object == null || !referenceTypes[typeof object]) {
      throw 'Object prototype may only be an Object or null'
    }

    let proto = {__proto__: object}

    if (props) {
      if (referenceTypes[typeof props]) {
        for (let propName in props) {
          if (hasOwnProperty.call(props, propName)) {
            let prop = props[propName]

            if (prop && referenceTypes[typeof prop]) {
              object[propName] = prop.value
            } else {
              throw 'Property description must be an object: value'
            }
          }
        }
      }
    }
    return proto
  }
}

export default Object.create