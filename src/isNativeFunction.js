import {toString} from './const'

const sNativeCode = (isNaN + '').slice((isNaN + '').indexOf('{'))
/**
 * test function is a javascript native method
 *
 * @param {Function} func native function of javascript
 * @return {Boolean}
 */
export default function isNativeFunction(func) {
  return toString.call(func) === '[object Function]' && sNativeCode === (func += '').slice(func.indexOf('{'))
}