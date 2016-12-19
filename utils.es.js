/*
 * @name: z-utils
 * @version: 1.0.1
 * @description: javascript Date Object extend
 * @author: zbm2001@aliyun.com
 * @license: Apache 2.0
 */
var toString = Object.prototype.toString;
/**
 * 输出对象类型的名称
 * @param  {Object|Null|Undefined|String|Number|Function|Array|RegExp|HTMLDocument|HTMLHtmlElement|NodeList|XMLHttpRequest} object 任意类型的对象或变量
 * @return {String}  类型名称的字符串，首字母大写
 */
function typeOf(object) {
  return toString.call(object).slice(8, -1);
}

var sNativeCode = (function (s) { return s.slice(s.indexOf('{')); })(isNaN + '');
/**
 * 判断是否为JS的原生方法
 * @param  {Function}  func 全局或对象的方法属性
 * @return {Boolean}
 */
function isNativeFunction(func) {
  return typeOf(func) === 'Function' && sNativeCode === (func += '').slice(func.indexOf('{'));
}

isNativeFunction(Object.assign) ||
  // es5 Object.assign
  (Object.assign = function assign(target/*, ...args*/) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var output = Object(target),
      i = -1,
      args = Array.prototype.slice.call(arguments, 1),
      l = args.length,
      prop, source;
    while (++i < l) {
      source = args[i];
      if (source != null) {
        for (prop in source) {
          if (source.hasOwnProperty(prop)) {
            output[prop] = source[prop];
          }
        }
      }
    }
    return output;
  });

var assign = Object.assign;

if (!isNativeFunction(Object.create)) {

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var REFERENCE_TYPE = {
    'object': !0,
    'function': !0
  };
  // es5 Object.create
  (Object.create = function create(object, props) {
    if (object == null || !REFERENCE_TYPE[typeof object]) {
      throw 'Object prototype may only be an Object or null';
    }
    var proto = { __proto__: object },
      prop, propName;

    if (props) {
      if (REFERENCE_TYPE[typeof props]) {
        for (propName in props) {
          if (hasOwnProperty.call(props, propName)) {
            if ((prop = props[propName]) && REFERENCE_TYPE[typeof prop]) {
              object[propName] = prop.value;
            } else {
              throw 'Property description must be an object: value';
            }
          }
        }
      }
    }
    return proto;
  });

}

var create = Object.create;

/**
 * 全局唯一标识符（GUID，Globally Unique Identifier）也称作 UUID(Universally Unique IDentifier) 。
 * GUID是一种由算法生成的二进制长度为128位的数字标识符。GUID 的格式为“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”，其中的 x 是 0-9 或 a-f 范围内的一个32位十六进制数。在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID。
 * GUID 的总数达到了2^128（3.4×10^38）个，所以随机生成两个相同GUID的可能性非常小，但并不为0。GUID一词有时也专指微软对UUID标准的实现。
 */

/**
 * 长度为4的字符串
 * return {String} length{4}  返回 0-9 或 a-f 范围内的一个32位十六进制数
 */
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 生成一个全局唯一标识符
 * @return {String} length{36} 返回格式为：“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx” 的字符串
 */
function uuid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export { assign, create, isNativeFunction, typeOf, uuid };
