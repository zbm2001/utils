import isNativeFunction from '../isNativeFunction'
import {StringProto, rb_spaces, r_spaces_e} from './const'

if (!isNativeFunction(StringProto.trim)) {
  StringProto.trim = function trim () {
    return this.replace(rb_spaces, '').replace(r_spaces_e, '')
  }

  StringProto.trimLeft = function trimLeft () {
    return this.replace(rb_spaces, '')
  }

  StringProto.trimRight = function trimRight () {
    return this.replace(r_spaces_e, '')
  }
}

if (!isNativeFunction(StringProto.repeat)) {
  StringProto.repeat = function repeat (n) {
    n = parseInt(n) || 0
    let s = ""
    while (n > 0) {
      if (n % 2 === 1) {
        s += this;
      }
      if (n === 1) return s
      s += s
      n = n >> 1 // 相当于将 n 除以 2 取其商，或者说是开 2 次方
    }
    return s
  }

  StringProto.includes = function includes (searchString, start) {
    if (typeof start !== 'number') start = 0

    if (start + search.length > this.length) return false
    return this.indexOf(search, start) > -1
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
   * @param {String} searchString
   * @param {Number} position uint
   * @returns {boolean}
   */
  StringProto.startsWith = function startsWith (searchString, position){
    return this.substr(position || 0, searchString.length) === searchString
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
   * @param {String} searchString
   * @param {Number} position uint
   * @returns {boolean}
   */
  StringProto.endsWith = function endsWith (searchString, position) {
    if (searchString.length > this.length) return false
    // This works much better than >= because
    // it compensates for NaN:
    if (!(position < this.length)) position = this.length
    else position |= 0 // round position
    return this.substr(position - searchString.length, searchString.length) === searchString
  }
}

if (!isNativeFunction(StringProto.padEnd)) {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
   * @param {Number} targetLength uint
   * @param {String} padString
   * @returns {string}
   */
  StringProto.padStart = function padStart (targetLength, padString) {
    targetLength = targetLength >> 0 //floor if number or convert non-number to 0;
    padString = String(padString || ' ')
    if (this.length > targetLength) return String(this)

    targetLength = targetLength - this.length
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(this)
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
   * @param {Number} targetLength uint
   * @param {String} padString
   * @returns {string}
   */
  StringProto.padEnd = function padEnd (targetLength, padString) {
    targetLength = targetLength >> 0 //floor if number or convert non-number to 0;
    padString = String(padString || ' ')
    if (this.length > targetLength) return String(this)

    targetLength = targetLength - this.length
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
    }
    return String(this) + padString.slice(0, targetLength)
  }
}