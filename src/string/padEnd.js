import './core'

export default function padEnd (str, length, withStr) {
  return String(str).padEnd(length, withStr)
}