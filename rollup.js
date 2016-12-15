// 项目下直接命令$ node rollup.js

const fs = require('fs');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');
const uglifyjs = require('uglify-js');
const package = require('./package.json');
const rollupConfig = package.rollupConfig || {};

/**
 * JS压缩最小化
 * @param  {String} code JS代码源文本
 * @return {String} 返回压缩后的代码文本
 */
function minify(code){
  var minifyOptions = { fromString: true };
  var result = uglifyjs.minify(code, minifyOptions);
  return result.code;
}

const banner = '/*\n' +
'name,version,description,author,license'.split(',')
.map((k) => ` * @${k}: ${package[k]}`).join('\n') +
'\n */';

const format = rollupConfig.format || 'amd';
const srcEntry = { amd: 'core', cjs: 'core', es: 'core', iife: 'core', umd: 'core' }[format];
const moduleName = rollupConfig.moduleName || package.name;

rollup.rollup({
  entry: 'src/' + srcEntry + '.js',
  plugins: [
    // 结合 buble 比 babel 更快
    buble({
      exclude: 'node_modules/**'
    })
    // 其他插件，如压缩代码等
    // ,uglify()
  ]
}).then(bundle => {

  var result = bundle.generate({
    // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
    format: format,
    moduleName: moduleName, // umd 或 iife 模式下，若入口文件含 export，必须加上该属性
    sourceMap: false
  });

  // dest 生成的目标文件
  fs.writeFileSync( package.main, banner + '\n' + result.code );
  // 若指定压缩最小化文件
  if(rollupConfig.minimize){
    let minMain = package.main.replace(/(?=\.js$)/, '.min');
    minMain === package.main && (minMain += '.min');
    fs.writeFileSync( minMain, banner + '\n' + minify(result.code) );
  }
  
  
  // // bundle写入方式
  // bundle.write({
  //   // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
  //   format: 'iife',
  //   moduleName: 'Date', // umd 或 iife 模式下，若入口文件含 export，必须加上该属性
  //   dest: moduleName + '.js',
  //   banner: banner,
  //   sourceMap: false
  // });

}).catch(e => {
  process.stderr.write(e.message + '\n');
  process.exit(1);
});