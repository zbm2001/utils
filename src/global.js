/**
 * get global object
 * @return {Object} global
 */
export default new Function('return this || (typeof global === "object" && global && global.global === global ? global : window)')()