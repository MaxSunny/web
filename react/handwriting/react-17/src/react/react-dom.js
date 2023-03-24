import {mount} from './mount';
import {update} from './update';

export function render(vnode,container){
    let current = container.current;
    if(!current){
        mount(vnode,container);
        container.current = vnode;
    }else{
        if(vnode){
            update(current,vnode,container);
            container.current=current;
        }else{
            container.removeChild(vnode.staticNode);
        }
    }
}