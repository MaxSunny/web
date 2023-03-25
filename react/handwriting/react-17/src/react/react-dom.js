import { mount } from "./mount";
import { update } from "./update";

export function render(vnode, container) {
  console.dir(container);
  //   debugger;
  let current = container.current; //current is point to the view on browser
  if (!current) {
    //the first ,the curret is null,so run mount
    mount(vnode, container);
    container.current = vnode;
  } else {
    if (vnode) {
      update(current, vnode, container);
      container.current = vnode;
    } else {
      container.removeChild(vnode.staticNode);
    }
  }
}
