import assign from './assign'
import create from './create'
import global from './global'
import isArray from './isArray'
import isEmptyObject from './isEmptyObject'
import isNativeFunction from './isNativeFunction'
import isPlainObject from './isPlainObject'
import keys from './keys'
import merge from './merge'
import namespace from './namespace'
import toArray from './toArray'
import typeOf from './typeOf'
import uuid from './uuid'
import {arrayForEach, arraySlice, hasOwnProperty, isClient, isServer, noop, referenceTypes, returnFalse, returnTrue, support__proto__, toString} from './core'

export * from './core'

export {
  assign,
  create,
  global,
  isArray,
  isEmptyObject,
  isNativeFunction,
  isPlainObject,
  keys,
  merge,
  namespace,
  toArray,
  typeOf,
  uuid
}

export default {
  arrayForEach,
  arraySlice,
  assign,
  create,
  global,
  hasOwnProperty,
  isArray,
  isClient,
  isEmptyObject,
  isNativeFunction,
  isPlainObject,
  isServer,
  keys,
  merge,
  noop,
  namespace,
  referenceTypes,
  returnFalse,
  returnTrue,
  support__proto__,
  toArray,
  toString,
  typeOf,
  uuid
}