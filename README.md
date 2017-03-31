# utils

## 安装
npm i z-utils

## 组件接口

### arraySlice(startIndex, endIndex)
即 Array.prototytpe.slice

#### 示例
utils.arraySlice.call({length:1, 0:1}, 0, 1) => [1]

### assign(target/*, ...args*/)
同 es5 的 Object.assign

#### 示例
utils.assign({a:1}, {b:2}) => {a:1,b:2}

### arrayForEach(func, scope)
即 Array.prototytpe.forEach

#### 示例
utils.arrayForEach.call({length:1, 0:1}, (v) => {}, null)

### create(obj, props)
同 es5 的 Object.create

#### 示例
utils.create(Array.prototype) => []

### global
js 全局宿主对象

#### 示例
utils.global => window or global

### hasOwnProperty(key)
即 Object.prototype.hasOwnProperty

#### 示例
utils.hasOwnProperty.call({a:1}, 'a') => true

### isArray(arr)
同 es5 的 Array.isArray

#### 示例
utils.isArray([]) => true

### isEmptyObject(obj)
判断对象是否有可枚举属性

#### 示例
utils.isEmptyObject({}) => true

### isNativeFunction(func)
判断参数是否为JS的原生方法

#### 示例
utils.isNativeFunction([].push) => true

### isPlainObject(obj)
判断对象是否由对象字面量或 new Object() 直接创建的

#### 示例
utils.isPlainObject({a:1}) => true

### keys(object)
获取一个对象的可枚举属性的数组

#### 示例
utils.keys({a: 1, b: 2}) => ['a', 'b']

### merge(target, ...overriders)
将属性树深度合并到目标对象

#### 示例
utils.merge({a:{b:{c:1}}}, {a:{b:{d:2}}}) => {a:{b:{c:1,d:2}}}

### namespace(root, sNamespace, variable)
为对象或任何类型的变量创建命名空间

#### 示例
utils.namespace(window, 'a.b.c', 1) => windw.a.b.c === 1

### referenceTypes
typeof 出的引用类型集

#### 示例
utils.referenceTypes => {'function': !0, 'object': !0}

### returnFalse()
始终返回 false 的函数

#### 示例
utils.returnFalse => returnFalse

### returnTrue()
始终返回 true 的函数

#### 示例
utils.returnTrue => returnTrue

### toString()
即 Object.prototype.toString

#### 示例
utils.toString.call([]) => '[object Array]'

### toArray(obj, startIndex, endIndex)
转换一个类数组对象为数组

#### 示例
utils.toArray({length:1, 0:1}, 0, 1) => [1]

### typeOf(obj)
返回参数的类型名称

#### 示例
utils.typeOf(/a/) => 'RegExp'

### uuid()
生成一个全局唯一标识符

#### 示例
utils.uuid() => "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

## 组件构建

### 从配置文件构建（rollup.config.js）
npm run build // rollup -c

或者：

### 自定义构建
npm run dev // node rollup

### 文档生成
npm install -global esdoc
echo '{"source": "./src", "destination": "./doc"}' > .esdoc.json
esdoc
#### 文档
doc/index.html

或者：

### dox
[https://github.com/tj/dox](https://github.com/tj/dox)
