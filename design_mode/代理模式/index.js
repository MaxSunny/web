//代理模式
//screen 请求一张图片信息
//封装的post、get请求  require.js
import Axios from 'axios'
export const post=(options)=>{
    //里边会封装一些其他的处理
 return Axios.post(options);
}
export const get=(options)=>{
    //里边封装其他的逻辑
    return Axios.get(options);
}
//写请求
async function generateShareImage(){
    const body = this.generateConfig();
    try{
        const res = await post({
            url:'/getData',
            body,
            setting:{
                domain:config.getExhibitionDomain()
            }
        });
        if(res?.picUrl) return res;
        return null;
    }catch(error){
        console.error('失败',JSON.stringify(error));
    }
    return null;
}

//新添加需求，将第一次请求中后端返回的garytype字段塞到后续请求中的headers中
let graytype = -1;
async function generateShareImage(){
    const body = this.generateConfig();
    try{
        const options={
            url:'/getData',
            body,
            setting:{
                domain:config.getExhibitionDomain()
            },
            headers:{}
        }
        if(graytype!==-1){
            options.headers.graytype=graytype
        }
        const res = await post(options);
        if(res?.graytype)graytype=res.graytype;
        if(res?.picUrl) return res;
        
        return null;
    }catch(error){
        console.error('失败',JSON.stringify(error));
    }
    return null;
}

//多个请求，一个一个的去改，费时费力
//用代理模式改进

//requireProxy.js
import {post as Post ,get as Get} from './require.js'
let graytypePropx = -1;
const getParams=(params)=>{
    let newParams;
    if(graytypePropx!==-1){
        newParams={
            ...params,
            headers:{
                ...params.headers,
                graytype:graytypePropx
            }
        }
    }
    return newParams;
}
export const getProxy=async (params)=>{
    const res = await Get(getParams(params));
    if(res.graytype){
        graytypePropx=res.graytype
    } 
return res;
}
export const portProxy=async (params)=>{
    const res = await Post(getParams(params));
    if(res.graytype){
        graytypePropx=res.graytype
    } 
return res;
}
//将getProxy和postProxy整合成一个代理函数
export const requireProxy = async (params,method='get')=>{
    const res = await method(getParams(params));
    if(res.graytype){
        graytypePropx=res.graytype
    } 
return res;
}