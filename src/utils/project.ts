import { useAsync } from "./use-async"
import { Project } from "screens/project-list/list"
import { useEffect } from "react"
import { cleanObejct } from "utils"
import { useHttp } from "./http"
export const useProjects=(param?:Partial<Project>)=>{
    const client = useHttp();
    const {run,...result} = useAsync<Project[]>()
    useEffect(()=>{
        run(client('projects',{data:cleanObejct(param||{})}))
    },[param])
    return result
}