# utils

## 安装
npm i z-utils

## 组件接口

### typeOf(object)
返回参数的类型名称

#### 示例
utils.typeOf(/a/) => "RegExp"

### assign(target/*, ...args*/)
同 es5 的 Object.assign

#### 示例
utils.assign({a:1}, {b:2}) => {a:1,b:2}

### create(object, props)
同 es5 的 Object.create

#### 示例
utils.assign(Array.prototype) => []

### isNativeFunction(func)
判断参数是否为JS的原生方法

#### 示例
utils.isNativeFunction([].push) => true

### uuid()
生成一个全局唯一标识符

#### 示例
utils.uuid() => "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

## 组件构建

### 从配置文件构建（rollup.config.js）
npm run build // rollup -c

或者：

### 自定义构建
npm run build:js // node rollup

### 文档生成
npm install -global esdoc
echo '{"source": "./src", "destination": "./doc"}' > .esdoc.json
esdoc
#### 文档
doc/index.html

或者：

### dox
[https://github.com/tj/dox](https://github.com/tj/dox)
