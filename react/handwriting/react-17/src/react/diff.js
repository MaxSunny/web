//老的
//[a,b] [c,d,b,a] --> [c,a,b]
//[a,b] [c,d,b,a] --> [c,d,a,b]
//[a,b] [c,d,b,a] --> [c,d,a,b]

import { mount } from "./mount";
import { update } from "./update";

export const diff = (prev, next, parent) => {
  let prevMap = {};
  let nextMap = {};
  let lastIndex = 0;

  //the fist for old children
  for (let i = 0; i < prev.length; i++) {
    let { key = `${i}` } = prev[i];
    prevMap[key] = i;
  }
  //then for new children
  for (let n = 0; n < next.length; n++) {
    let { key = `${n}` } = next[n];
    nextMap[key] = n;
    // 根据key 是不是可以找到老的节点 prevNode
    let prevIndex = prevMap[key];
    //新的节点
    let nextChild = next[n];
    if (prevIndex == null) {
      //老的里面没有找到，要插入
      let refNode =
        n === 0 ? prev[0].staticNode : next[n - 1].staticNode.nextSibling;
      mount(nextChild, parent, refNode);
    } else {
      //如果找到了
      update(prev[prevIndex], nextChild, parent);
      if (prevIndex < lastIndex) {
        //上一个节点的下一个节点前面，进行插入
        let refNode = next[n - 1].staticNode.nextSibling;
        parent.insertBefore(nextChild.staticNode, refNode);
      } else {
        lastIndex = prevIndex;
      }
    }
  }
  for (let i = 0; i < prev.length; i++) {
    let { key = `${i}` } = prev[i];
    if (!nextMap.hasOwnProperty(key)) {
      parent.removeChild(prev[i].staticNode);
    }
  }
};
