/*
 * @Author: your name
 * @Date: 2021-05-24 15:26:15
 * @LastEditTime: 2021-05-24 17:21:15
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
import InfosCreator from './create';
import TagsCreator from './tags_create'
import  { connect } from 'umi';
import { get } from 'lodash';

interface INewsType {
    dispatch: Dispatch
}

const NewsList: React.FC<INewsType> = ()=>{
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddTagsModal, setShowTagsAddModal] = useState(false);
    return(
        <>
        <PageContainer 
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="3" onClick={()=>setShowAddModal(true)}>创建资讯</Button>,
          <Button key="4" onClick={()=>{setShowTagsAddModal(true)}}>创建标签</Button>
        ]}
        ></PageContainer>
        <InfosCreator   show={showAddModal} closeInfosModel={setShowAddModal} />
        <TagsCreator  show={showAddTagsModal} closeInfosModel={setShowTagsAddModal} />
        </>
    )
}

export default NewsList