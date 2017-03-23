import global from './global'

/**
 * set or get namespace
 * @return {Boolean} true
 */
export default (Object.ns = Object.namespace = function namespace (root, sNamespace, variable) {
  // 变量判断转化
  if (typeof root === 'string') {
    variable = sNamespace
    sNamespace = root
    root = global
  }

  if (!root || typeof sNamespace !== 'string') {
    return
  }

  let namespaces = sNamespace.split('.')
  let i = -1
  let l = namespaces.length - 1

  // 若未定义，则为获取命名空间
  if (typeof variable === 'undefined') {
    while (++i < l) {
      root = root[namespaces[i]]
      if (!root) {
        return
      }
    }
    return root[namespaces[l]]
  }

  while (++i < l) {
    root = root[namespaces[i]] || (root[namespaces[i]] = {})
  }
  return (root[namespaces[l]] = variable)
})