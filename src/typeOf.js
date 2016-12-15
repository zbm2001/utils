var toString = Object.prototype.toString;
/**
 * 输出对象类型的名称
 * @param  {Object|Null|Undefined|String|Number|Function|Array|RegExp|HTMLDocument|HTMLHtmlElement|NodeList|XMLHttpRequest} object 任意类型的对象或变量
 * @return {String}  类型名称的字符串，首字母大写
 */
export default function typeOf(object) {
  return toString.call(object).slice(8, -1);
}