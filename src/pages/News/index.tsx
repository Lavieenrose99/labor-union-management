/*
 * @Author: your name
 * @Date: 2021-05-24 15:26:15
 * @LastEditTime: 2021-05-24 15:56:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/index.tsx
 */
import React,{ useState, useEffect} from 'react'
import request from '@/utils/request'
import { PageContainer } from '@ant-design/pro-layout'
import { List, Avatar, Space, Modal, Button, Image} from 'antd';
import {  FilePptTwoTone, DeleteTwoTone} from '@ant-design/icons';
import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get } from 'lodash';

interface INewsType {
    dispatch: Dispatch
}

const NewsList: React.FC<INewsType> = ()=>{
    const [ showCreate, setShowCreate ] = useState<boolean>(false)
    return(
        <>
        <PageContainer 
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="3" onClick={()=>setShowCreate(true)}>创建资讯</Button>,
        ]}
        ></PageContainer>
        <Modal visible={showCreate} onCancel={()=>setShowCreate(false)} width={400}>
        <div>
            111
        </div>
       
      </Modal>
        </>
    )
}

export default NewsList