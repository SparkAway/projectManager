import React from 'react';
import {Select,Input,Form} from 'antd'
import { Project } from './list';
interface SearchPanelProps{
    users:User[];
    param:Pick<Project,'name'|'personId'>
    setParam:(param:SearchPanelProps['param'])=>void;
    
}

export interface User{
    id:number;
    name:string;
    email:string;
    title:string;
    organization:string;
    token:string;
}

export const SearchPanel =(props:SearchPanelProps)=>{
    const {param,setParam,users} = props

    return <Form style={{marginBottom:'2rem'}} layout={"inline"}>
        <Form.Item>
            <Input placeholder={'项目名'}  type="text" value={param.name} onChange={evt=>setParam({
                ...param,
                name: evt.target.value
            })}/>
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={value=>setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value={''}>负责人</Select.Option>
                {
                    users.map(user=> <Select.Option key={user.id} value={String(user.id)}>{user.name}</Select.Option>)
                }
            </Select>
        </Form.Item>
    </Form>
}