import { SearchPanel } from "./search-panel"
import { useState ,useEffect } from "react"
import { List } from "./list" 
import React from "react"
import { cleanObejct, useDebounce, useDocumentTitle, useMount } from "utils"
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd"
import { useAsync } from "utils/use-async"
import { Project } from "./list"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { Helmet } from 'react-helmet';
import { useUrlQueryParam } from "utils/url"
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen =()=>{
    const [param,setParam] = useUrlQueryParam(['name','personId'])
    const projectsParam = {...param,personId:Number(param.personId)||undefined}
    const debounceParam = useDebounce(param,200);
    const {isLoading,error,data:list} = useProjects(debounceParam)
    const {data:users} = useUsers()

    useDocumentTitle('项目列表',false)

    console.log(useUrlQueryParam(['name']))
    return <div>
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users||[]} param={param} setParam={setParam}/>
            {error?<Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
            <List loading={isLoading} users={users||[]} dataSource={list || []}/>
        </Container>
    </div>
}

const Container = styled.div`
    padding: 3.2rem;
`