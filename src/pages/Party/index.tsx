/*
 * @Author: your name
 * @Date: 2021-04-27 14:48:00
 * @LastEditTime: 2021-05-10 17:13:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/index.tsx
 */
import React,{ useState, useEffect} from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { List, Avatar, Space, Modal, Button } from 'antd';
import {  FilePptTwoTone, DeleteTwoTone} from '@ant-design/icons';
import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get } from 'lodash';



const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

interface PartyCourseProps {
    dispatch: Dispatch
    CoureseEnity: any
}


const PartyCourseList: React.FC<PartyCourseProps> = (props)=>{

    const { dispatch, CoureseEnity } = props
    const listData = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < CoureseEnity.length; i++) {
      listData.push({
        id: CoureseEnity[i].id,
        href: 'https://ant.design',
        video: CoureseEnity[i].course_video,
        title: `党建系列课 ${CoureseEnity[i].name}`,
        avatar: 'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.jpeg',
        description: <div><strong>创建人: </strong><span>{CoureseEnity[i].person}</span></div>,
        ppt: CoureseEnity[i].course_ppt,
        content:
          '一心向党好好学习又红又专',
      });
    }
    useEffect(()=>{
        dispatch({
            type: 'partycourse/fetchPartyList',
            payload: {
                limit: 20,
                page:1
            }
        })
    },[])

    
    
    return (
        <PageContainer 
        >
         <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={listData}
    footer={
      <div>
        <b>全国总工会</b> 惠福党建中心
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={FilePptTwoTone} text={<a  href={item.ppt} >点击下载课程ppt</a>} key="list-vertical-message" />,
          <IconText icon={DeleteTwoTone} text={
              <span onClick={
                  ()=>{
                      Modal.info({
                          title: '惠福管理后台',
                          content: '确认要删除该课程吗',
                          okText: '确认',
                          onOk: ()=>{
                              dispatch({
                                type: 'partycourse/delPartyCourse',
                                payload: item.id
                                
                              })
                          }
                      })
                  }
              }>删除课程</span>
          } key="list-vertical-like-o" />,
        ]}
        extra={
          <video
            width={272}
            src={item.video}
            controls={true}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />,
         </PageContainer>
    )
}



export default connect(({ partycourse }: any) => ({
    CoureseEnity: get(partycourse, 'CoureseEnity', []),
  }))(PartyCourseList);