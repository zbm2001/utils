// 项目下直接运行命令 rollup -c
// import buble from 'rollup-plugin-buble';
var buble = require('rollup-plugin-buble');
const pkg = require('./package.json');
const banner = '/*\n' +
'name,version,description,author,license'.split(',')
.map((k) => ` * @${k}: ${pkg[k]}`).join('\n') +
'\n */';
var external = Object.keys(pkg.devDependencies);

module.exports = {
  entry: 'src/core.js',
  plugins: [
    // 结合 buble 比 babel 更快
    buble({
      exclude: 'node_modules/**'
    })
  ],
  external: external,
  targets: [ // 多文件生成有BUG ！！var a,b; => var a; var b; var var a; var var b; ......
    {
      dest: 'utils.js',
      format: 'umd'
    }, {
      dest: 'utils.es.js',
      format: 'es'
    }/*, {
      dest: 'utils.amd.js',
      format: 'amd'
    }, {
      dest: 'utils.cjs.js',
      format: 'cjs'
    }, {
      dest: 'utils.umd.js',
      format: 'umd'
    }, {
      dest: 'utils.iife.js',
      format: 'iife'
    }*/
  ],
  banner: banner,
  // format: 'iife', // cjs amd es6 umd iife
  moduleName: 'utils', // umd 或 iife 模式下，若入口文件含 export，必须加上该属性
  // dest: 'utils.js', // 输出文件
  // sourceMap: false   // 调试编译
}