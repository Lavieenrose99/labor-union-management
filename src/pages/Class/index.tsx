/*
 * @Author: your name
 * @Date: 2021-05-25 11:16:06
 * @LastEditTime: 2021-06-17 19:45:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Class/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Avatar, Modal, Button, Image, Space, Radio, Table } from 'antd';
import ClassCreator from './create';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';
import { IconText, IconFont } from '@/utils/public/tools';
import './index.less';
import { DeleteTwoTone } from '@ant-design/icons';
import { ConBindObjArr, JumpToOtherRouteById } from '@/utils/public/tools';
import request from '@/utils/request';
import moment from 'moment';
import StudentDetails from './person';

interface IClassType {
  dispatch: Dispatch;
  ClassEnity: any;
  CourseEnity: any;
  pageTotal: number;
}

const ClassList: React.FC<IClassType> = (props) => {
  const { ClassEnity, dispatch, CourseEnity, pageTotal } = props;
  const AccountList = JSON.parse(sessionStorage.getItem('accountList') ?? '[]');
  const [classPerson, setClassPerson] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showStudents, setShowStudents] = useState<boolean>(false);
  const [showWays, setShowWays] = useState<number>(2);
  const dataSet = ConBindObjArr(ClassEnity, CourseEnity, 'party_course_id', 'id', 'class_course');
  const Classcolumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '班级名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课程名称',
      dataIndex: 'class_course',
      render: (data: any) => {
        return <span>{data.name}</span>;
      },
    },
    {
      title: '教师名',
      dataIndex: 'teacher_name',
    },
    {
      title: '课程码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'create_time',
      align: 'center' as 'center',
      render: (createTime: number) => (
        <span>{moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'create_time',
      align: 'center' as 'center',
      render: (createTime: number) => (
        <span>{moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: '操作',
      render: (_: any, record: any) => {
        return (
          <Space size="large">
            <Button
              type="primary"
              onClick={() => {
                JumpToOtherRouteById('/party/index', dispatch, record.class_course.id);
              }}
            >
              查看课程
            </Button>
            <Button
              type="primary"
              onClick={() => {
                request(
                  `/api.request/v1/party_course/class/sign_up/list_by_cid/${record.id}`,
                  {},
                ).then((data) => {
                  const { Lists } = data;
                  const CombineData = ConBindObjArr(Lists, AccountList, 'user_id', 'id', 'account');
                  setClassPerson(CombineData);
                });
                setShowStudents(!showStudents);
              }}
            >
              查看学员
            </Button>
            <Button
              danger
              onClick={() => {
                Modal.info({
                  title: '惠福管理后台',
                  content: '确认要删除该班级吗',
                  okText: '确认',
                  onOk: () => {
                    dispatch({
                      type: 'partycourse/delPartyClass',
                      payload: record.id,
                    });
                  },
                  closable: true,
                });
              }}
            >
              删除班级
            </Button>
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch({
      type: 'partycourse/fetchClassList',
      payload: {
        limit: 5,
        page: 1,
      },
    });
    dispatch({
      type: 'partycourse/fetchPartyList',
      payload: {
        limit: 10,
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
          <section className="party_class_switch">
            <Radio.Group
              defaultValue={showWays}
              onChange={(e) => {
                setShowWays(e.target.value);
              }}
            >
              <Radio.Button value={1}>
                <IconFont type="icon-liebiao" style={{ marginRight: 4 }} />
                列表
              </Radio.Button>
              <Radio.Button value={2}>
                <IconFont type="icon-biaoge" style={{ marginRight: 4 }} />
                表格
              </Radio.Button>
            </Radio.Group>
          </section>
          <section className="party_class_list">
            {showWays === 1 ? (
              <List
                bordered
                itemLayout="vertical"
                size="default"
                pagination={{
                  total: pageTotal,
                  pageSize,
                  onShowSizeChange: (current, size) => {
                    setPageSize(size);
                  },
                  onChange: (page, size) => {
                    setpageCurrent(page);
                    dispatch({
                      type: 'partycourse/fetchClassList',
                      payload: {
                        page,
                        limit: size,
                      },
                    });
                  },
                  showTotal: (total) => `第 ${pageCurrent} 页 共 ${total} 条`,
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
                        icon={<IconFont type="icon-chakan" />}
                        text={
                          <span
                            onClick={() => {
                              JumpToOtherRouteById('/party/index', dispatch, item.class_course.id);
                            }}
                          >
                            查看课程信息:{' '}
                            <strong>{item.class_course.name || <em>课程删除</em>}</strong>
                          </span>
                        }
                      />,
                      <IconText
                        icon={<IconFont type="icon-renyuanguanli" />}
                        text={
                          <span
                            onClick={() => {
                              request(
                                `/api.request/v1/party_course/class/sign_up/list_by_cid/${item.id}`,
                              ).then((data) => {
                                const { Lists } = data;
                                const CombineData = ConBindObjArr(
                                  Lists,
                                  AccountList,
                                  'user_id',
                                  'id',
                                  'account',
                                );
                                setClassPerson(CombineData);
                                setShowStudents(true);
                              });
                            }}
                          >
                            查看班级报名
                          </span>
                        }
                      />,
                      <IconText
                        icon={<DeleteTwoTone twoToneColor="red" />}
                        text={
                          <span
                            className="action-click"
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
                        src="https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-picunnamed.jpeg"
                        width={200}
                        height={100}
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.jpeg" />
                      }
                      title={
                        <Space size="large">
                          <span>{item.name}</span>{' '}
                          <IconText
                            icon={<IconFont type="icon-mima" />}
                            text={
                              <span>
                                课程码: <strong>{item.code}</strong>
                              </span>
                            }
                          />
                        </Space>
                      }
                      description={`教师名称: ${item.teacher_name}`}
                    />
                    {
                      <section style={{ marginLeft: 60, maxHeight: '2.5vw', overflow: 'hidden' }}>
                        <strong>{item.introduce}</strong>
                      </section>
                    }
                  </List.Item>
                )}
              />
            ) : (
              <Table 
              style={{ padding: 20}}
              dataSource={dataSet} 
              columns={Classcolumns} 
              pagination={{
                total: pageTotal,
                pageSize,
                onShowSizeChange: (current, size) => {
                  setPageSize(size);
                },
                onChange: (page, size) => {
                  setpageCurrent(page);
                  dispatch({
                    type: 'partycourse/fetchClassList',
                    payload: {
                      page,
                      limit: size,
                    },
                  });
                },
                showTotal: (total) => `第 ${pageCurrent} 页 共 ${total} 条`,
              }}
              />
            )}
          </section>
        </div>
      </PageContainer>
      <ClassCreator show={showAddModal} closeInfosModel={setShowAddModal} />
      <StudentDetails onCloseDrawer={setShowStudents} show={showStudents} person={classPerson} />
    </>
  );
};

export default connect(({ partycourse }: any) => ({
  ClassEnity: get(partycourse, 'ClassEnity', []),
  CourseEnity: get(partycourse, 'CoureseEnity', []),
  pageTotal: get(partycourse, 'PageTotal', 0),
}))(ClassList);
