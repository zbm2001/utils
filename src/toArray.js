import {arraySlice} from './const'

export default function toArray (object, startIndex, endIndex) {
  if (object == null) {
    throw new Error('can not convert from null or undefined')
  }
  return arraySlice.call(object, startIndex, endIndex)
}