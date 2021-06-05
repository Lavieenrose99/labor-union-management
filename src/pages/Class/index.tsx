/*
 * @Author: your name
 * @Date: 2021-05-25 11:16:06
 * @LastEditTime: 2021-05-30 22:34:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Class/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Avatar, Modal, Button, Image } from 'antd';
import ClassCreator from './create';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';
import { IconText, IconFont } from '@/utils/public/tools';
import './index.less';
import { DeleteTwoTone } from '@ant-design/icons';

interface IClassType {
  dispatch: Dispatch;
  ClassEnity: any;
}

const ClassList: React.FC<IClassType> = (props) => {
  const { ClassEnity, dispatch } = props;
  const [showAddModal, setShowAddModal] = useState(false);
  const listData = [];
  console.log(ClassEnity);
  // const listData = [];
  for (let i = 0; i < ClassEnity.length; i++) {
    listData.push({
      href: 'https://ant.design',
      name: `${ClassEnity[i].name} 班`,
      avatar: 'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.jpeg',
      introduce: ClassEnity[i].introduce,
      teacher: ClassEnity[i].teacher_name,
      code: ClassEnity[i].code,
      id: ClassEnity[i].id
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
        <div className="party_class_list_container">
          <section className="party_class_list">
            <List
              bordered
              itemLayout="vertical"
              size="default"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 10,
              }}
              dataSource={listData}
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
                      icon={<IconFont type="icon-laoshi" />}
                      text={<span>{`课程教师 ${item.teacher}`}</span>}
                    />,
                    <IconText
                      icon={<DeleteTwoTone twoToneColor="red" />}
                      text={
                        <span
                          className="action-click"
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
                          删除班级
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
                      width={200}
                      height={100}
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.name}</a>}
                    description={item.introduce}
                  />
                </List.Item>
              )}
            />
          </section>
        </div>
      </PageContainer>
      <ClassCreator show={showAddModal} closeInfosModel={setShowAddModal} />
    </>
  );
};

export default connect(({ partycourse }: any) => ({
  ClassEnity: get(partycourse, 'ClassEnity', []),
}))(ClassList);
