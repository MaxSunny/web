import { mount } from "./mount";

function pathChildren(prev,next,parent){
    //因为整个diff，还是很耗性能的，所以我们先做一些优化
    if(!prev){
        if(next){
            next = next instanceof Array?next : [next];
            for(let i of next){
                mount(i,parent);
            }
        }else{}
    }else{
        if(prev instanceof Array){
            diff(prev,next,parent)
        }else{
            //prev is a single，has only one node
            if(!next) parent.removeChild(prev.staticNode)
            else if(next && (next instanceof Array)){
                //prev is one ,next is Array
                parent.removeChild(prev.staticNode);
                for(let i of next){
                    mount(i,parent);
                }
            }else{
                update(prev,next,parent)
            }
        }
    }
}

export const update = function(prev,next,container){
    //if type is different
    if(prev.type !== next.type){
        container.removeChild(prev.staticNode);
        mount(next,container);
        return;
    }
    //if type is same
    //take props first,take children
    const {props:{children:prevChildren,...prevProps}} = prev;
    const {props:{children:nextChildren,...nextProps}} = prev;
    //patch props
    const staticNode = (next.staticNode = prev.staticNode);
    for(let key of Object.keys(prevProps)){
        let prev = prevProps[key];
        next = nextProps[key];
        patchProps(key,prev,next,staticNode);
    }
    //<div className='main'></div>
    //<div style={{color:'red'}}></div>
    for(let key of Object.keys(prevProps)){
        let prev = prevProps[key];
        patchProps(key,prev,null,staticNode);
    }

    //patch children
    pathChildren(
        prevChildren,nextChildren,staticNode
    )

}

export const patchProps = function(key,prev,next,staticNode){
    if(key === 'style'){
        if(next){
            for(let k in next){
                staticNode.style[k] = next[k];
            }
        }
        if(prev){
            for(let k in prev){
                if(!next.hasOwnProperty(k)){
                    staticNode.style[k] = ''
                }
            }
        }
    }
    else if(key === 'className'){
        if(!staticNode.classList.contains(next)){
            staticNode.classList.add(next);
        }
    }
    else if(key[0] === 'o' && key[1] === 'n'){
        prev && staticNode.removeEventListener(key.slice(2).toLowerCase(),prev);
        next && staticNode.addEventListener(key.slice(2).toLowerCase(),prev);
    }
}