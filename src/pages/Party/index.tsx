/*
 * @Author: your name
 * @Date: 2021-04-27 14:48:00
 * @LastEditTime: 2021-05-24 11:53:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/index.tsx
 */
import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Avatar, Space, Modal, Button, Image } from 'antd';
import { FilePptTwoTone, DeleteTwoTone } from '@ant-design/icons';
import CreatePartyCourse from './create';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export interface PartyCourseProps {
  dispatch: Dispatch;
  CoureseEnity: any;
}

const PartyCourseList: React.FC<PartyCourseProps> = (props) => {
  const { dispatch, CoureseEnity } = props;
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const listData = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < CoureseEnity.length; i++) {
    listData.push({
      id: CoureseEnity[i].id,
      href: 'https://ant.design',
      video: CoureseEnity[i].data.course_video,
      title: `党建系列课 ${CoureseEnity[i].name}`,
      avatar: 'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.jpeg',
      description: (
        <div>
          <strong>创建人: </strong>
          <span>{CoureseEnity[i].data.person}</span>
        </div>
      ),
      ppt: CoureseEnity[i].course_ppt,
      content: CoureseEnity[i].course_brief,
      cover: CoureseEnity[i].course_cover,
    });
  }
  useEffect(() => {
    dispatch({
      type: 'partycourse/fetchPartyList',
      payload: {
        limit: 10,
        page: 2,
      },
    });
    request('/api.monitor/data/pv', {
      method: 'GET',
    }).then((data) => {
      console.log(data);
    });
    request('/api.monitor/data/uv', {
      method: 'GET',
    }).then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <PageContainer
      ghost={false}
      onBack={() => window.history.back()}
      title="党课列表"
      extra={[
        <Button key="3" onClick={() => setShowCreate(true)}>
          创建课程
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
        dataSource={listData}
        footer={
          <div>
            <b>全国总工会</b> 惠福党建中心
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={FilePptTwoTone}
                text={<a href={item.ppt}>点击下载课程ppt</a>}
                key="list-vertical-message"
              />,
              <IconText
                icon={FilePptTwoTone}
                text={<a href={item.ppt}>点击下载课程ppt</a>}
                key="list-vertical-message"
              />,
              <IconText
                icon={DeleteTwoTone}
                text={
                  <span
                    onClick={() => {
                      console.log(item);
                      Modal.info({
                        title: '惠福管理后台',
                        content: '确认要删除该课程吗',
                        okText: '确认',
                        onOk: () => {
                          dispatch({
                            type: 'partycourse/delPartyCourse',
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
                src={item.cover}
                width={300}
                height={180}
                fallback="http://qiniu.fmg.net.cn/picture-1606378155000"
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
      />
      ,
      <Modal visible={showCreate} onCancel={() => setShowCreate(false)} width={1000}>
        <CreatePartyCourse />
      </Modal>
    </PageContainer>
  );
};

export default connect(({ partycourse }: any) => ({
  CoureseEnity: get(partycourse, 'CoureseEnity', []),
  UploadStatus: get(partycourse, 'status', false),
}))(PartyCourseList);
