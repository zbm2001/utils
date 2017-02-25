import global from './global'

/**
 * 定义命名空间
 * @return {Boolean} true
 */
export default (Object.ns = Object.namespace = function namespace (root, sNamespace, variable) {
  let namespaces, i, l

  if (typeof root === 'string') {
    variable = sNamespace
    sNamespace = root
    root = global
  }

  if (!root || typeof sNameSpace !== 'string') {
    return
  }

  namespaces = sNamespace.split('.')
  i = -1
  l = namespaces.length - 1

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