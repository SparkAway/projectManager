import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit{
    token?:string,
    data?:object
}
export const http = async (endpoint:string,{data,token,headers,...customConfig}:Config={})=>{
    const config = {
        method:'GET',
        headers:{
            Authorization:token?`Bearer ${token}`:'',
            'Content-Type':data?'application/json':''
        },
        //customConfig会覆盖上面的值
        ...customConfig
    }
    if(config.method.toUpperCase()==='GET'){
        //qs把指定对象转化为url
        endpoint += `?${qs.stringify(data)}`
    }else{
        config.body = JSON.stringify(data||{})
    }
    return window.fetch(`${apiUrl}/${endpoint}`,config)
        .then(async response=>{
            if(response.status===401){
                await auth.logout()
                window.location.reload()
                return Promise.reject({message:'请重新登录'})
            }
            const data = await response.json()
            if(response.ok){
                return data
            }else{
                return Promise.reject(data)
            }
        })
}
//如果你的函数要使用其他hook的话那本身函数就应该是个hook
export const useHttp=()=>{
    const {user} = useAuth()
    return (...[endpoint,config]:Parameters<typeof http>)=>http(endpoint,{...config,token:user?.token})
}