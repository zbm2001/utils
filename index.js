'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var AP = Array.prototype;
var OP = Object.prototype;

var arrayForEach = AP.forEach;
var arraySlice = AP.slice;
var toString = OP.toString;
var hasOwnProperty = OP.hasOwnProperty;

var referenceTypes = {'object': !0, 'function': !0};

var support__proto__ = typeof __proto__ !== 'undefined';

/**
 * function empty, do nothing
 * @return {Undefined}
 */
function noop () {
}

/**
 * function allways return false
 * @return {Boolean} false
 */
function returnFalse () {
  return false
}

/**
 * function allways return true
 * @return {Boolean} true
 */
function returnTrue () {
  return true
}

var sNativeCode = (isNaN + '').slice((isNaN + '').indexOf('{'));
/**
 * test function is a javascript native method
 *
 * @param {Function} func native function of javascript
 * @return {Boolean}
 */
function isNativeFunction(func) {
  return toString.call(func) === '[object Function]' && sNativeCode === (func += '').slice(func.indexOf('{'))
}

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

    var output = Object(target),
        i = -1,
        args = Array.prototype.slice.call(arguments, 1),
        l = args.length;

    while (++i < l) {
      var source = args[i];

      if (source) {
        for (var prop in source) {
          if (source.hasOwnProperty(prop)) {
            output[prop] = source[prop];
          }
        }
      }
    }
    return output
  };
}

var assign = Object.assign;

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

    var proto = support__proto__ ? {__proto__: object} : (noop.prototype = object, new noop);

    if (props) {
      if (referenceTypes[typeof props]) {
        for (var propName in props) {
          if (hasOwnProperty.call(props, propName)) {
            var prop = props[propName];

            if (prop && referenceTypes[typeof prop]) {
              object[propName] = prop.value;
            } else {
              throw 'Property description must be an object: value'
            }
          }
        }
      }
    }
    return proto
  };
}

var create = Object.create;

/**
 * get global object
 * @return {Object} global
 */
var global$1 = (function () {
  return this || (typeof global === 'object' && global && global.global === global ? global : window)
})();

if (!isNativeFunction(Array.isArray)) {
  /**
   * polyfill es5 Array.isArray
   *
   * @param {Array} arg
   * @returns {Boolean}
   */
  Array.isArray = function isArray(arg) {
    return toString.call(arg) === '[object Array]'
  };
}

var isArray = Array.isArray;

/**
 * test an object use 'for in'
 *
 * @param {Object} [object]
 * @return {Boolean}
 */
function isEmptyObject(object) {
  for (var k in object) {
    return false
  }
  return true
}

/**
 * test traverse own property first use "for in" (IE lt 10 return true)
 * @return {Boolean}
 */
var firstTraverseOwnProperty = function () {
  var o = {a: 1};
  var c = create(o);
  c.b = 1;
  for (var k in c) {
    return k === 'b'
  }
}();

/**
 * test an object is plain (eg: {} or new Object() created)
 *
 * @param {Object} [object]
 * @return {Boolean}
 */
function isPlainObject(object) {
  // Must be an Object.
  // Because of IE, we also have to check the presence of the constructor property.
  // Make sure that DOM nodes and window objects don't pass through, as well
  if (!object || toString.call(object) !== "[object Object]") { return false }
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
    for (var k$1 in object) {
      return hasOwnProperty.call(object, k$1)
    }
    return true
  }
  for (var k$2 in object) {}
  return k === undefined || hasOwnProperty.call(object, k)
}

if (!isNativeFunction(Object.keys)) {
  var unableEnumerateOwnKeys, key;
  for (key in {toString: 1}) { break }

  // IE 某些属性即便为自身属性也无法枚举
  key || (unableEnumerateOwnKeys = 'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(' '));

  /**
   * polyfill es5.1 Object.keys
   *
   * @param {Object} object
   * @returns {Object} like {__proto__: *}
   */
  Object.keys = function keys (object) {
    var arrkeys = [], key, l, i;
    if( unableEnumerateOwnKeys ){
      l = unableEnumerateOwnKeys.length;
      i = -1;
      while( ++i < l ){
        hasOwnProperty.call(object, unableEnumerateOwnKeys[i]) && (arrkeys[ l++ ] = unableEnumerateOwnKeys[i]);
      }
    }
    for( key in object ){
      hasOwnProperty.call(object, key) && (arrkeys[ l++ ] = key);
    }
    return arrkeys
  };
}

var keys = Object.keys;

/**
 * object deep merge
 *
 * @param {Object} target
 * @return {Object} target
 */
function merge(target/*, ...args*/) {
  var arguments$1 = arguments;

  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  for (var l = arguments.length, i = 0; ++i < l;) {
    var overrider = arguments$1[i];

    if (overrider && overrider !== target) {
      if (isArray(overrider)) {
        mergeArray(target, overrider);
      } else {
        mergeObject(target, overrider);
      }
    }
  }
  return target

  function mergeArray(target, overrider){
    for (var n = overrider.length, k = -1; ++k < n;) {
      deepMerge(target, overrider, k);
    }
  }

  function mergeObject(target, overrider){
    for (var k in overrider) {
      deepMerge(target, overrider, k);
    }
  }

  function deepMerge(target, overrider, key) {
    var oValue = overrider[key];
    var tValue = target[key];

    if (oValue && oValue !== tValue && typeof oValue === 'object') {

      if (isArray(oValue)) {
        target[key] = mergeArray(tValue && isArray(tValue) ? tValue : [], oValue);

      } else if (isPlainObject(oValue)) {
        target[key] = mergeObject(tValue && isPlainObject(tValue) ? tValue : {}, oValue);

      } else {
        target[key] = oValue;
      }
    } else {
      target[key] = oValue;
    }
  }
}

/**
 * set or get namespace
 * @return {Boolean} true
 */
var namespace = (Object.ns = Object.namespace = function namespace (root, sNamespace, variable) {
  // 变量判断转化
  if (typeof root === 'string') {
    variable = sNamespace;
    sNamespace = root;
    root = global$1;
  }

  if (!root || typeof sNamespace !== 'string') {
    return
  }

  var namespaces = sNamespace.split('.');
  var i = -1;
  var l = namespaces.length - 1;

  // 若未定义，则为获取命名空间
  if (typeof variable === 'undefined') {
    while (++i < l) {
      root = root[namespaces[i]];
      if (!root) {
        return
      }
    }
    return root[namespaces[l]]
  }

  while (++i < l) {
    root = root[namespaces[i]] || (root[namespaces[i]] = {});
  }
  return (root[namespaces[l]] = variable)
});

var slice = Array.prototype.slice;

function toArray (object, startIndex, endIndex) {
  if (object == null) {
    throw new Error('can not convert from null or undefined')
  }
  return slice.call(object, startIndex, endIndex)
}

/**
 * judge a object type name
 *
 * @param  {Object|Null|Undefined|String|Number|Function|Array|RegExp|HTMLDocument|HTMLHtmlElement|NodeList|XMLHttpRequest|...} object any
 * @return {String} string of type name, initials Capitalized
 */
function typeOf(object) {
  return toString.call(object).slice(8, -1)
}

/**
 * 全局唯一标识符（GUID，Globally Unique Identifier）也称作 UUID(Universally Unique IDentifier) 。
 * GUID是一种由算法生成的二进制长度为128位的数字标识符。
 * GUID 的格式为“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”，其中的 x 是 0-9 或 a-f 范围内的一个32位十六进制数。
 * 在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID。
 * GUID 的总数达到了2^128（3.4×10^38）个，所以随机生成两个相同GUID的可能性非常小，但并不为0。
 * GUID一词有时也专指微软对UUID标准的实现。
 */

/**
 * string of 4 chars
 *
 * return {String} length{4} 0-9 or a-f 范围内的一个32位十六进制数
 */
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

/**
 * 生成一个全局唯一标识符
 * @return {String} length{36} 返回格式为：“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx” 的字符串
 */
function uuid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}

var index = {
  arrayForEach: arrayForEach,
  arraySlice: arraySlice,
  assign: assign,
  create: create,
  global: global$1,
  hasOwnProperty: hasOwnProperty,
  isArray: isArray,
  isEmptyObject: isEmptyObject,
  isNativeFunction: isNativeFunction,
  isPlainObject: isPlainObject,
  keys: keys,
  merge: merge,
  noop: noop,
  namespace: namespace,
  referenceTypes: referenceTypes,
  returnFalse: returnFalse,
  returnTrue: returnTrue,
  support__proto__: support__proto__,
  toArray: toArray,
  toString: toString,
  typeOf: typeOf,
  uuid: uuid
};

exports.assign = assign;
exports.create = create;
exports.global = global$1;
exports.isArray = isArray;
exports.isEmptyObject = isEmptyObject;
exports.isNativeFunction = isNativeFunction;
exports.isPlainObject = isPlainObject;
exports.keys = keys;
exports.merge = merge;
exports.namespace = namespace;
exports.toArray = toArray;
exports.typeOf = typeOf;
exports.uuid = uuid;
exports['default'] = index;
exports.arrayForEach = arrayForEach;
exports.arraySlice = arraySlice;
exports.toString = toString;
exports.hasOwnProperty = hasOwnProperty;
exports.referenceTypes = referenceTypes;
exports.support__proto__ = support__proto__;
exports.noop = noop;
exports.returnFalse = returnFalse;
exports.returnTrue = returnTrue;
