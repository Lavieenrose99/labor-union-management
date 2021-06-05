/*
 * @Author: your name
 * @Date: 2021-05-25 11:16:06
 * @LastEditTime: 2021-06-05 14:17:51
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
import { ConBindObjArr, JumpToOtherRouteById } from '@/utils/public/tools'

interface IClassType {
  dispatch: Dispatch;
  ClassEnity: any;
  CourseEnity: any;
}

const ClassList: React.FC<IClassType> = (props) => {
  const { ClassEnity, dispatch, CourseEnity, pageTotal } = props;
  const [showAddModal, setShowAddModal] = useState(false);
  const dataSet = ConBindObjArr(ClassEnity,CourseEnity,'party_course_id','id','class_course')
  console.log(dataSet)

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
                total: pageTotal
              }}
              dataSource={dataSet}
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
                      icon={<IconFont type="icon-mima" />}
                       text={<span>课程码: <strong>{item.code}</strong></span>}
                    />,
                    <IconText
                      icon={<IconFont type="icon-chakan" />}
                       text={<span onClick={()=>{JumpToOtherRouteById('/party/index',dispatch,item.class_course.id )}} >
                         查看课程信息: <strong>{item.class_course.name || <em>课程删除</em>}</strong></span>}
                    />,
                    <IconText
                      icon={<DeleteTwoTone twoToneColor="red" />}
                      text={
                        <span
                          onClick={() => {
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
                        item.class_course.course_cover || 'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.png'
                      }
                      width={200}
                      height={100}
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src="https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.jpeg" />}
                    title={<a href={item.href}>{item.name}</a>}
                    description={`教师名称: ${item.teacher_name}`}
                  />
                   {<section style={{marginLeft: 60, maxHeight: '2.5vw', overflow: 'hidden'}}>
                    <strong >{item.introduce}</strong></section>}
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
  CourseEnity: get(partycourse,'CoureseEnity',[]),
  pageTotal: get(partycourse,'pageTotal',0)
}))(ClassList);
