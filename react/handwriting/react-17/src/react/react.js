/**
 * VNode need attr
 * 1. type 类型
 * 2. staticNode 真实节点
 * 3. key 身份标识代码
 * 4. props 属性 以及后代
 *      nodeValue 文本节点的值
 * 5. $$ 一些其他的自定义属性
 *      flag 节点类型
 */

export const NODE_FLAG = {
  EL: 1, //元素
  TEXT: 1 << 1,
};
const createTextNode = text => {
  return {
    type: "",
    props: {
      nodeValue: text + "",
    },
    $$: {
      flag: NODE_FLAG.TEXT,
    },
  };
};

const createVNode = (type, props, key, $$) => {
  return {
    type,
    props,
    key,
    $$,
  };
};
export const createElement = (type, props, ...children) => {
  props = props || [];
  let key = props.key || void 0;

  const kids = props.children || children;
  children = kids.map(child =>
    typeof child === "string" ? createTextNode(child) : child
  );

  if (children.length) {
    props.children = children.length === 1 ? children[0] : children;
  }

  //定义一些内部属性
  const $$ = {};
  // $$.staticNode = null;
  $$.flag = type === "" ? NODE_FLAG.TEXT : NODE_FLAG.EL;

  return createVNode(type, props, key, $$);
};
