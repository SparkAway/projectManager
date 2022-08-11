import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown)=>value===0?false:!value

export const isVoid = (value:unknown)=>value===undefined||value===null||value===''

export const cleanObejct = (object: {[key:string]:unknown})=>{
    const result = {...object}
    Object.keys(result).forEach(key=>{
        const value = result[key]
        if(isVoid(value)){
            delete result[key]
        }
    })
    return result
}

export const useMount=(callback: ()=>void)=>{
    useEffect(()=>{
        callback()
    }, [])
}

export const useDebounce=<V>(value: V,delay?:number)=>{
    const [debounceValue,setDebounceValue] = useState(value)

    useEffect(()=>{
        const timeout = setTimeout(()=>setDebounceValue(value),delay)
        //每次在一个useEffect处理完以后再运行
        return ()=>clearTimeout(timeout)
    },
    [value,delay])
    
    return debounceValue
}
export const useDocumentTitle = (title:string,keepOnUnmount:boolean=true)=>{
    const oldTitle =useRef(document.title).current
    useEffect(()=>{
        document.title = title
    },[title])

    useEffect(()=>{
        //return一个函数这个函数就会在页面被卸载的时候调用
        return ()=>{
            if(!keepOnUnmount){
                //如果不指定依赖就是旧title
                document.title = oldTitle
            }
        }
    },[keepOnUnmount,oldTitle])
}

export const resetRoute = () =>window.location.href = window.location.origin