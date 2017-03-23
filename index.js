'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arraySlice = Array.prototype.slice;

var toString = Object.prototype.toString;

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

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * reference types
 * @return {Object}
 */
var referenceTypes = {
  'object': !0,
  'function': !0
};

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

    var proto = {__proto__: object};

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

var arrayForEach = Array.prototype.forEach;

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
 * @param {Object} [obj]
 * @return {Boolean}
 */
function isEmptyObject(obj) {
  for (var k in obj) {
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
 * @param {Object} [obj]
 * @return {Boolean}
 */
function isPlainObject(obj) {
  // Must be an Object.
  // Because of IE, we also have to check the presence of the constructor property.
  // Make sure that DOM nodes and window objects don't pass through, as well
  if (!obj || toString.call(obj) !== "[object Object]") { return false }
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
    for (var k$1 in obj) {
      return hasOwnProperty.call(obj, k$1)
    }
    return true
  }
  for (var k$2 in obj) {}
  return k === undefined || hasOwnProperty.call(obj, k)
}

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

/**
 * function allways return false
 * @return {Boolean} false
 */
function returnFalse (object) {
  return false
}

/**
 * function allways return true
 * @return {Boolean} true
 */
function returnTrue (object) {
  return true
}

var slice = Array.prototype.slice;

function toArray (obj, startIndex, endIndex) {
  if (obj == null) {
    throw new Error('can not convert from null or undefined')
  }
  return slice.call(obj, startIndex, endIndex)
}

/**
 * judge a object type name
 *
 * @param  {Object|Null|Undefined|String|Number|Function|Array|RegExp|HTMLDocument|HTMLHtmlElement|NodeList|XMLHttpRequest|...} object any
 * @return {String} string of type name, initials Capitalized
 */
function typeOf(obj) {
  return toString.call(obj).slice(8, -1)
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
  arraySlice: arraySlice,
  arrayForEach: arrayForEach,
  assign: assign,
  create: create,
  global: global$1,
  hasOwnProperty: hasOwnProperty,
  isArray: isArray,
  isEmptyObject: isEmptyObject,
  isNativeFunction: isNativeFunction,
  isPlainObject: isPlainObject,
  merge: merge,
  namespace: namespace,
  returnFalse: returnFalse,
  returnTrue: returnTrue,
  toArray: toArray,
  toString: toString,
  typeOf: typeOf,
  uuid: uuid
};

exports.arraySlice = arraySlice;
exports.arrayForEach = arrayForEach;
exports.assign = assign;
exports.create = create;
exports.global = global$1;
exports.hasOwnProperty = hasOwnProperty;
exports.isArray = isArray;
exports.isEmptyObject = isEmptyObject;
exports.isNativeFunction = isNativeFunction;
exports.isPlainObject = isPlainObject;
exports.merge = merge;
exports.namespace = namespace;
exports.returnFalse = returnFalse;
exports.returnTrue = returnTrue;
exports.toArray = toArray;
exports.toString = toString;
exports.typeOf = typeOf;
exports.uuid = uuid;
exports['default'] = index;
