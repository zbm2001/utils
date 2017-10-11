import './core'

export default function padStart (str, length, withStr) {
  return String(str).padStart(length, withStr)
}