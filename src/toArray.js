const slice = Array.prototype.slice

export default function toArray (object, startIndex, endIndex) {
  if (object == null) {
    throw new Error('can not convert from null or undefined')
  }
  return slice.call(object, startIndex, endIndex)
}