/**
 * get global object
 * @return {Object} global
 */
export default (function () {
  return this || (typeof global === 'object' && global && global.global === global ? global : window)
})()
