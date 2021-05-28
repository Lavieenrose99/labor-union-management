/*
 * @Author: your name
 * @Date: 2021-05-25 11:16:06
 * @LastEditTime: 2021-05-25 14:09:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Class/index.tsx
 */

 
import React,{ useState, useEffect} from 'react'
import request from '@/utils/request'
import { PageContainer } from '@ant-design/pro-layout'
import { List, Avatar, Space, Modal, Button, Image} from 'antd';
import ClassCreator from './create'
import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get } from 'lodash';

interface INewsType {
    dispatch: Dispatch
}

const ClassList: React.FC<INewsType> = ()=>{
    const [showAddModal, setShowAddModal] = useState(false);
    return(
        <>
        <PageContainer 
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="3" onClick={()=>setShowAddModal(true)}>创建课程</Button>
        ]}
        ></PageContainer>
        <ClassCreator  show={showAddModal} closeInfosModel={setShowAddModal} />
        </>
    )
}

export default ClassList