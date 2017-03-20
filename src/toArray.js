const slice = Array.prototype.slice

export default function toArray (obj, startIndex, endIndex) {
  if (obj == null) {
    throw new Error('can not convert from null or undefined')
  }
  return slice.call(obj, startIndex, endIndex)
}