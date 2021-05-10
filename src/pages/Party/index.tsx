/*
 * @Author: your name
 * @Date: 2021-04-27 14:48:00
 * @LastEditTime: 2021-05-10 14:51:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/index.tsx
 */
import React,{ useState, useEffect} from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
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
    console.log(CoureseEnity)
   
    const listData = [];
    for (let i = 0; i < CoureseEnity.length; i++) {
      listData.push({
        href: 'https://ant.design',
        video: CoureseEnity[i].course_video,
        title: `党建系列课 ${CoureseEnity[i].name}`,
        avatar: 'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.jpeg',
        description: <div><strong>创建人: </strong><span>{CoureseEnity[i].person}</span></div>,
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }

    useEffect(()=>{
        dispatch({
            type: 'partycourse/fetchPartyList',
            payload: {
                limit: 16,
                page:2
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
        <b>ant design</b> footer part
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
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