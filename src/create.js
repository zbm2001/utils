import isNativeFunction from './isNativeFunction'
import {hasOwnProperty, noop, referenceTypes, support__proto__} from './const'

/**
 * polyfill es5 Object.create
 *
 * @param {Object} object
 * @param {Object} props
 * @returns {Object} like {__proto__: *}
 */
export default isNativeFunction(Object.create) ? Object.create : (Object.create = function create(object, props) {
  if (object == null || !referenceTypes[typeof object]) {
    throw 'Object prototype may only be an Object or null'
  }

  let proto = support__proto__ ? {__proto__: object} : (noop.prototype = object, new noop)

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
})