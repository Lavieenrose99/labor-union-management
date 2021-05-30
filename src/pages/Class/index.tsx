/*
 * @Author: your name
 * @Date: 2021-05-25 11:16:06
 * @LastEditTime: 2021-05-25 14:09:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Class/index.tsx
 */

import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Avatar, Space, Modal, Button, Image } from 'antd';
import ClassCreator from './create';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

interface INewsType {
  dispatch: Dispatch;
  ClassEnity: any;
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const ClassList: React.FC<INewsType> = (props) => {
  const { ClassEnity, dispatch } = props;
  const [showAddModal, setShowAddModal] = useState(false);
  // const listData = [];
  for (let i = 0; i < 5; i++) {
    ClassEnity.push({
      href: 'https://ant.design',
      title: `班级 ${i}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: '这是一个新的班级',
      content: 'HHHHHHHHHHHHH',
    });
  }
  useEffect(() => {
    dispatch({
      type: 'partycourse/fetchClassList',
      payload: {
        limit: 20,
        page: 1,
      },
    });
  }, []);
  const aa: any = [...ClassEnity];
  console.log('课程列表123' + aa);
  return (
    <>
      <PageContainer
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="3" onClick={() => setShowAddModal(true)}>
            创建班级
          </Button>,
        ]}
      >
        <List
          bordered
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={ClassEnity}
          footer={
            <div>
              <b>欢迎来到班级列表</b>
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item.code}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text={
                    <span
                      onClick={() => {
                        console.log(item);
                        Modal.info({
                          title: '惠福管理后台',
                          content: '确认要删除该班级吗',
                          okText: '确认',
                          onOk: () => {
                            dispatch({
                              type: 'partycourse/delPartyClass',
                              payload: item.id,
                            });
                          },
                          closable: true,
                        });
                      }}
                    >
                      删除课程
                    </span>
                  }
                  key="list-vertical-like-o"
                />,
              ]}
              extra={
                <Image
                  src={
                    'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=6b0285c1a0345982c5dfed943cc41d95/8b13632762d0f7036d50846905fa513d2797c5a1.jpg'
                  }
                  width={300}
                  height={180}
                  fallback=""
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.code}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
        ,
      </PageContainer>
      <ClassCreator show={showAddModal} closeInfosModel={setShowAddModal} />
    </>
  );
};

export default connect(({ partycourse }: any) => ({
  ClassEnity: get(partycourse, 'ClassEnity', []),
}))(ClassList);
