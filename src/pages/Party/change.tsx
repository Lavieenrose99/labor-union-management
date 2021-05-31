/*
 * @Author: your name
 * @Date: 2021-05-30 17:23:24
 * @LastEditTime: 2021-05-31 12:18:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/change.tsx
 */
/*
 * @Author: your name
 * @Date: 2021-04-27 14:48:00
 * @LastEditTime: 2021-05-30 17:23:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/index.tsx
 */
import React,{ useState, useEffect } from 'react'
import { UploadAntd } from '@/utils/upload/qiniu'
import { PageContainer } from '@ant-design/pro-layout'
import { BookTwoTone } from '@ant-design/icons'
import { Input, Button, message, Spin, Select, Drawer, Descriptions, Avatar, Space } from 'antd'
import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get, map } from 'lodash';
import CreatorPartyCourse from '@/utils/upload/richTextUpload'
import './index.less'

interface PartyCourseProps {
    dispatch: Dispatch
    show: boolean
    UploadStatus: boolean
    GoodsList: [] 
    showInfos: {}
    onCloseDrawer: any
}


const PartyShowChange: React.FC<PartyCourseProps> = (props)=>{

  const { dispatch, show, onCloseDrawer , showInfos } = props
    useEffect(()=>{
        dispatch({
            type: 'partycourse/fetchPartyGoodsList',
            payload: {
                limit: 10,
                page: 1
            }
        })
    },[])

   console.log(showInfos)
    return (
      <>
        <Drawer
          title="课程详情"
          placement="right"
          onClose={()=>onCloseDrawer(false)}
          visible={show}
          width={500}
        >
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="创建人">
            {
              <Space>
              <Avatar src={showInfos.avatar}/>
              <span>{showInfos.id}</span>
              </Space>
            }
            </Descriptions.Item>
        </Descriptions>
        </Drawer>
      </>
    );
}



export default connect(({ partycourse }: any) => ({
    CoureseEnity: get(partycourse, 'CoureseEnity', []),
    UploadStatus: get(partycourse, 'status',false),
    GoodsList: get(partycourse,'CourseGoods',[])
  }))(PartyShowChange);