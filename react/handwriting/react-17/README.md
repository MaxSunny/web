# React 源码

20:00 开始


## 目标

- 知道 react 大致的实现思路。
- 使用上，有自己的心得。

- Fiber
- hook
- context

```jsx
drawData(list: Array<XXObject>) {

}
drawData(list) {

}

function A () {

    return <div>
        <ul v-for>
        </ul>
    </div>
}

```

## 什么是编译？？
编辑就是，你定义一个语法规则，我给按照一定的方式解析出来。


## React 的 包历史。

### React 15 
1,2,3  --> 2,4,6
223 -- 243 -- 246
stack reconciler

### React 16.9
- hooks 

- Fiber 的架构

### React 17.0.2
- lagacy -- 同步 
- concurrent -- 异步

### React 18
同步的更新 --> 异步可中断的更新。
- Suspense
- batching update
- lane, scheduler


## 调用栈
- render
  - legacyRenderSubtreeIntoContainer
    - legacyCreateRootFromDOMContainer
      - createLegacyRoot
      - 
