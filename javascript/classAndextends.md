# 类与继承

## 目标
- 搞清楚原型链
- 知道组合寄生继承，知道class继承
- 知道怎么创建类 function / class

## 面向过程 和 面向对象
OOP
### 面向过程
描述的是过程量，强调的是，我做一件事情的全流程。

### 面向对象

### js 对象的创建

#### 创建一个对象有哪几种方法
不局限于以下三种方法

##### Object.create();
```js
const foo = Object.create({});
const bar = {}

Object.create(null)
Object.create(Object.prototype)
hasOwnProperty
if(Object.prototype.hasOwnProperty){
    return Object.prototype.hasOwnProperty.call(obj,key)
} //这样写的原因：通过Object.create(null)创建的对象没有原型，直接调用会报错

Object.prototype.toString.call()
hasOwn方法 stage4 //补充
```

##### var bar = {}


##### new 关键字
```js
function Persion(name){
    this.name=name
}

Persion.prototype.getName = function(){
    console.log(this.name)
}

const p = new Persion('安娜')

//1. new 创造一个对象，指向函数的原型
p.__proto__ === Persion.prototype

//2. 构造函数上，有个原型（是个对象），里面有个constructor 函数，就是这个构造函数本身

Persion.prototype.constructor === Persion

//3. p对象的构造函数，是 Persion
p.constructor === Persion

```
###### new关键字，到底干了什么？
- 创建了一个对象
- 该对象的原型，指向了这个 Function 的 prototype
- 该对象实现了这个构造函数的方法
- 根据一些特定情况，返回对象
  - 如果没有返回值，则返回我创建的这个对象
  - 如果有返回值，是一个对象，则返回该对象
  - 如果有返回值，不是一个对象，则返回我创建的这个对象

```js
  function newFunc(Father){
    if(typeof Father !== 'function'){
        throw new Error('new operator function the first param must be a function')
    }
    var obj = Object.create(Father.prototype);
    var result = Father.apply(obj,Array.prototype.slice.call(arguments,1))
    return result && typeof result === 'object' && result !== null ? result:obj
  }
```

### 继承
其实实现一个继承，主要就是两个部分：
- 使用父类的构造函数方法和原型函数
- 让对象的原型链指向父类

ES5 原型继承 - 构造函数继承 - 组合继承 - 组合寄生继承
ES6 class 继承
#### 原型继承
每个实例的原型都是同一个父类对象
```js
function Parent() {
    this.name = 'father'
}
Parent.prototype.getName = function() {
    console.log(this.name)
}

function Child() {}

Child.prototype = new Parent() 
// Child.prototype.__proto__===Parent.prototype
Child.prototype.constructor = Child

//隐含的问题
//1. 如果有属性是引用的属性，一旦某个实例修改了这个属性，那么都会被修改
//2. 创建child的时候，是不能传参的
```

#### 构造函数继承
无法使用父类构造函数的原型
```js
function parent (actions,name) {
    this.actions = actions;
    this.name = name;
}

function Child (id) {
    Parent.apply(this,Array.prototype.slice.call(arguments,1));
    this.id = id;
}

//隐含的问题
//1. 属性和方法要想被继承的话 ，只能在构造函数中定义
//2. 如果方法在构造函数中定义了，每次都会创建。
```


#### 组合继承
调用两次构造函数，造成浪费

#### 组合寄生式继承

#### 组合寄生继承 和 class 继承有什么区别？




#### 成熟期
##### CJS - Commonjs
> node.js指定（制定？）的标准
特征：
* 通过module + export 去对外暴漏接口
* 通过require去调用其他模块

模块组织方式
dep.js
```js
//引入部分
const dependecyModule1 = require('./dependecyModule1')

//核心逻辑
let count = 0；
.......

//
```

> * 优点
CJS服务侧角度解决了依赖全局污染问题
> * 缺憾
针对服务端 服务端同步 没有异步的东西

新的问题 - 异步依赖

#### AMD
> 通过异步加载 + 允许定制回调函数

经典实现框架：require.js

新增定义方式
```js
//通过define来定义一个模块，然后调用require去加载
define(id,[depends],callback);
require([module],callback);
```

** 面试题：如何对已有代码做兼容
1. 增加定义阶段
2. 返回作为回调内部的return

##### CMD规范
> 按需加载
主要应用框架 sea.js
```js
//
define()
```


运行环境稳定

## 浏览器相关
### 一、认识浏览器运行态下的JS
#### 包含：BOM、DOM、ECMAScript
```js
 
```

### 二、BOM
#### 1. location
location.href -> 'https://applnzi6vl27059.pc.xiaoe-tech.com/bought'
        .origin -> 'https://applnzi6vl27059.pc.xiaoe-tech.com'  //主地址，地址前半部
        .protocal -> 'https:'
        


