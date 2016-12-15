import typeOf from './typeOf';

const sNativeCode = (s => s.slice(s.indexOf('{')))(isNaN + '');
/**
 * 判断是否为JS的原生方法
 * @param  {Function}  func 全局或对象的方法属性
 * @return {Boolean}
 */
export default function isNativeFunction(func) {
  return typeOf(func) === 'Function' && sNativeCode === (func += '').slice(func.indexOf('{'));
}