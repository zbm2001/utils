import isNativeFunction from '../isNativeFunction'
import {StringProto, rb_spaces, r_spaces_e} from './const'

if (!isNativeFunction(StringProto.trim)) {
  StringProto.trim = function trim () {
    return this.replace(rb_spaces, '').replace(r_spaces_e, '')
  }
  StringProto.trimLeft = function trim () {
    return this.replace(rb_spaces, '')
  }
  StringProto.trimRight = function trim () {
    return this.replace(r_spaces_e, '')
  }
}