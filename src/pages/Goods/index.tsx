/*
 * @Author: your name
 * @Date: 2021-05-27 16:16:09
 * @LastEditTime: 2021-05-29 17:35:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Goods/index.tsx
 */
/*
 * @Author: your name
 * @Date: 2021-05-25 11:16:06
 * @LastEditTime: 2021-05-26 13:46:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Class/index.tsx
 */

 
import React,{ useState, useEffect} from 'react'
import request from '@/utils/request'
import { PageContainer } from '@ant-design/pro-layout'
import { List, Avatar, Space, Modal, Button, Image} from 'antd';
import type { Dispatch } from 'umi';
import GoodsCreator from './create'
import  { connect } from 'umi';
import { get } from 'lodash';

interface IGoodsType {
    dispatch: Dispatch
}

const GoodsList: React.FC<IGoodsType> = ()=>{
    const [showAddModal, setShowAddModal] = useState(false);
    return(
        <>
        <PageContainer 
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="3" onClick={()=>setShowAddModal(true)}>新增商品</Button>
        ]}
        >

            
        </PageContainer>
        <GoodsCreator  show={showAddModal} 
        closeInfosModel={setShowAddModal}
         StroageCover="goodCover" 
         StroagePictures="goodsPictures" />
        </>
    )
}

export default GoodsList