import { NODE_FLAG } from "./react";
import { patchProps } from "./update";

export function mount(vnode,container,refNode){
    if(!container) throw new Error('container 不存在');
    const $$ = vnode.$$;
    if($$.flag & NODE_FLAG.TEXT){
        //if a text node , direct create
        const staticNode = document.createTextNode(vnode.props.nodeValue);
        vnode.staticNode = staticNode;
        container.appendChild(staticNode);
    }else if ($$.flag & NODE_FLAG.EL){
        //if a element,(not component)
        const {type,props} = vnode;
        const staticNode = document.createElement(type);
        vnode.staticNode = staticNode;
        //deal children and others
        const {children,...rest} = props;
        if(Object.keys(rest).length){
            for(let [key,value] of Object.entries(rest)){
                // 
                patchProps(key,null,value,staticNode)
            }
        }
        if(children){
            const kids = children instanceof Array?children:[children];
            for(let kid of kids){
                mount(kid,staticNode);
            }
        }
        refNode ? container.insertBefore(staticNode,refNode):container.appendChild(staticNode);
    }
}