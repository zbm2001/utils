
/**
 * 全局唯一标识符（GUID，Globally Unique Identifier）也称作 UUID(Universally Unique IDentifier) 。
 * GUID是一种由算法生成的二进制长度为128位的数字标识符。
 * GUID 的格式为“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”，其中的 x 是 0-9 或 a-f 范围内的一个32位十六进制数。
 * 在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID。
 * GUID 的总数达到了2^128（3.4×10^38）个，所以随机生成两个相同GUID的可能性非常小，但并不为0。
 * GUID一词有时也专指微软对UUID标准的实现。
 */

/**
 * string of 4 chars
 *
 * return {String} length{4} 0-9 or a-f 范围内的一个32位十六进制数
 */
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).slice(1)
}

/**
 * 生成一个全局唯一标识符
 * @return {String} length{36} 返回格式为：“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx” 的字符串
 */
export default function uuid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}