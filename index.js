/*
 * @name: z-utils
 * @version: 1.1.6
 * @description: javascript uitls
 * @author: zbm2001@aliyun.com
 * @license: Apache 2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toString = Object.prototype.toString;

/**
 * judge a object type name
 *
 * @param  {Object|Null|Undefined|String|Number|Function|Array|RegExp|HTMLDocument|HTMLHtmlElement|NodeList|XMLHttpRequest|...} object any
 * @return {String} string of type name, initials Capitalized
 */
function typeOf(object) {
  return toString.call(object).slice(8, -1)
}

var sNativeCode = (isNaN + '').slice((isNaN + '').indexOf('{'));
/**
 * test function is a javascript native method
 *
 * @param {Function} func native function of javascript
 * @return {Boolean}
 */
function isNativeFunction(func) {
  return typeOf(func) === 'Function' && sNativeCode === (func += '').slice(func.indexOf('{'))
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

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var REFERENCE_TYPE = {
    'object': !0,
    'function': !0
  };

  /**
   * polyfill es5 Object.create
   *
   * @param {Object} object
   * @param {Object} props
   * @returns {Object} like {__proto__: *}
   */
  Object.create = function create(object, props) {
    if (object == null || !REFERENCE_TYPE[typeof object]) {
      throw 'Object prototype may only be an Object or null'
    }

    var proto = {__proto__: object};

    if (props) {
      if (REFERENCE_TYPE[typeof props]) {
        for (var propName in props) {
          if (hasOwnProperty.call(props, propName)) {
            var prop = props[propName];

            if (prop && REFERENCE_TYPE[typeof prop]) {
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
 * function allways return false
 * @return {Boolean} false
 */
function returnFalse (object) {
  return false
}

/**
 * 返回全局对象
 * @return {Object} global
 */
var global$1 = (function () {
  return this || (typeof global === 'object' && global && global.global === global ? global : window)
})();

/**
 * 定义命名空间
 * @return {Boolean} true
 */
var namespace = (Object.ns = Object.namespace = function namespace (root, sNamespace, variable) {
  var namespaces, i, l;

  if (typeof root === 'string') {
    variable = sNamespace;
    sNamespace = root;
    root = global$1;
  }

  if (!root || typeof sNameSpace !== 'string') {
    return
  }

  namespaces = sNamespace.split('.');
  i = -1;
  l = namespaces.length - 1;

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
 * function allways return true
 * @return {Boolean} true
 */
function returnTrue (object) {
  return true
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

exports.assign = assign;
exports.create = create;
exports.returnFalse = returnFalse;
exports.global = global$1;
exports.isNativeFunction = isNativeFunction;
exports.namespace = namespace;
exports.returnTrue = returnTrue;
exports.typeOf = typeOf;
exports.uuid = uuid;
