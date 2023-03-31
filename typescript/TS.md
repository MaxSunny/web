## TypeScript 详解
### 一、TS基础概念
#### 1.什么是TS
a. 对比原理
* 是JS的超集，在JS原有语法之上，添加了可选静态类型和基于类的面向对象编程
> 面向项目
TS - 面向解决大型复杂项目，多人协同架构及代码维护复杂的场景
JS - 脚本化语言，用于面向简单页面场景

> 自主检测
TS - 编译期间，主动发现并纠正提示错误 =》编译时
JS - 运行时报错

> 类型检测
TS - 弱类型，编译时支持动态和静态类型检查
JS - 弱类型，无静态类型选项

> 运行流程
TS - 依赖编译，打包实现并且转译成浏览器可以运行的代码
JS - 可以直接被浏览器运行

> 复杂特性
TS - 模块化、范型、接口

b. 安装运行
```js
npm install -g typescript
tsc -v

//面试点：所有的类型检测和纠错阶段 - 编译时
```
#### 2. TS基础类型与写法
* boolean 、string、number、array、Null、undefined
```ts
//es
let isEnable = true;
let class = 'string';
let classNum = 1;
let u = undefined;
let n = null;
let array = ['a','b'];

//ts
let isEnable: boolean = true;
let class: string = 'string';
let classNum: number = 1;
let u: undefined = undefined;
let n: null = null;
let array: string[] = ['a','b'];
let array: Array<string> = ['a','b'];
```

* tuple - 元组
数组的元
```ts
let tupleType : [string,boolean];
tupleType = ['zw',true];
```

* enum - 枚举
```ts
//数字类枚举 - 默认从零开始，依次递增
enum Score{
    BAD,
    NG,
    GOOD,
    PERFECT
}
//离散型数据
let score: Score = Score.BAD;


//字符串类型的枚举
enum Score{
    BAD = 'bad',
    NG = 'ng',
    GOOD = 'good',
    PERFECT = 'perfect'
}

//值

//反向映射
//只支持数字型枚举，不支持字符串枚举

//异构状态
enum Enum{
    A,
    B,
    C = 'c',
    D = 'd',
    E = 6,
    F
}
//面试：指出每种具体值
//1. 第一个未明确赋值的项目为0 =》 所有未赋值的依次往下推，直到被数字打断
//2. 从数字打断处继续进行依次排序
//3. 有明确赋值的保留明确赋值

//=》JS本质实现（手写异步枚举）
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "c";
    Enum["D"] = "d";
    Enum[Enum["E"] = 6] = "E";
    Enum[Enum["F"] = 7] = "F";
})(Enum || (Enum = {}));
```

* any 、unknow、void、never
```ts
//any - 绕过所有的类型检查 =》 类型检测和编译筛查全部失效
let anyValue: any = 123;
anyValue = 'anyValue';
anyValue = false

let anyV: boolean = anyValue;

//unknow - 绕过赋值检查 =》 禁止更改传递
let unknowValue: unknow ;
unknowValue = 123;
unknowValue = true;
unknowValue = 'unknowValue';

let val1: unknow = unknowValue; //yes
let val2: any = unknowValue; //yes,在any面前，所有检查都形同虚设
let val3: boolean =unknowValue //no

//void（与any相反？） - 声明返回值 =》 会结束，但无返回值
function voidFn():void{
    console.log('没有返回值')
}

//never - 永不返回 or 永远error
function error(msg:string):never{
    throw new Error(msg)
}

function loop():never{
    while(true){
        //...
    }
}
```

* object / Object / {} - 对象
```ts
//object - 非原始类型 
//TS将JS Object 分成了两个接口来定义
 

```
### 二、接口 - interface

* 对行为或类型的抽象，具体行为实现由类或对象来完成
```ts
// 描述了对象的内容
interface Class{
    name: string;
    time: number;
}
//说明了当前类里包含哪些属性，以及属性的类型

let zhaowa: Class{
    name: 'ts',
    time: 2
}

// 只读 & 任意
interface Class{
    readonly name: string;
    time: number;
}

//面试题 - 和es的引用不同 =》 const
let arr: number[] = [1, 2, 3];
let ro: ReadonlyArray<number> = arr;
ro[0] = 112; //ERROR - 赋值
ro.push(2);//ERROR - 增加
ro.length = 9;//ERROR - 长度改写
arr = ro;//ERROR - 覆盖
arr[0] = 12;
console.log(ro[0])//12
//编译时会严格校验是否修改过

//任意可添加属性
interface Class{
    readonly name: string;
    time: number;
    [propName: string]: any;
}
```
### 三、交叉类型 - &
```ts
interface A {x:D}
interface B {x:E}
interface C {x:F}

interface D {d:boolean}
interface E {e:string}
interface F {f:number}

type ABC = A & B & C; \
//type可用于计算，interface只能描述一个函数或对象
let abc: ABC = {
    x:{
        d:true,
        e:'a',
        c:1
    }
}

//合并冲突问题
interface A{
    c: string;
    d: number;
}

interface B{
    c:boolean;
    e:string;
}
type AB = A & B
let ab: AB = {
 d:5,
 e:'class'
}
//合并是且的关系 =》 c：never
```

### 四、断言 - 类型的声明、转换（和编译器的告知交流）
* 编译时作用
```ts
//尖括号形式说明 - 阶段性类型
let anyValue: any = 'zhaowa';
let anyLenght: number = (<string>anyValue).length

//或者 AS声明
let anyValue: any = 'zhaowa';
let anyLenght: number = (anyValue as string).length

//非空判断 - 只确定不是空
type ClassTime = () => number
const start = (classTime: ClassTime | undefined) =>{
    let num = classTime!(); //具体类型待定，但确定非空
}
```