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
      n = n >> 1 //相当于将n除以2取其商，或者说是开2次方
    }
    return s
  }

  StringProto.includes = function includes (str) {
  }

  StringProto.startsWith = function startsWith (str) {
  }

  StringProto.endsWith = function endsWith (str) {
  }
}

if (!isNativeFunction(StringProto.padEnd)) {
  StringProto.padStart = function padStart (length, str) {
  }

  StringProto.padEnd = function padEnd (length, str) {
  }
}