
import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Avatar, Space, Modal, Button, Image } from 'antd';
import { FilePptTwoTone, DeleteTwoTone, VideoCameraTwoTone } from '@ant-design/icons';
import { getLength } from '@/utils/public/tools'
import ShowPartyDetails from './change'
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

interface PartyCourseProps {
  dispatch: Dispatch;
  CoureseEnity: any;
}

const PartyCourseList: React.FC<PartyCourseProps> = (props) => {
  const { dispatch, CoureseEnity } = props;
  const [ showCreate, setShowCreate] = useState<boolean>(false);
  const [ showDetails, setShowDetails ] = useState<boolean>(false)
  const listData = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < CoureseEnity.length; i++) {
    listData.push({
      id: CoureseEnity[i].id,
      href: 'https://ant.design',
      video: CoureseEnity[i].data.video,
      cover: CoureseEnity[i].course_cover,
      title: `党建系列课 ${CoureseEnity[i].name}`,
      avatar: 'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.jpeg',
      description: (
        <div>
          <strong>创建人: </strong>
          <span>{CoureseEnity[i].person}</span>
        </div>
      ),
      ppt: CoureseEnity[i].data.ppt ,
      content: '一心向党好好学习又红又专',
    });
  }
  useEffect(() => {
    dispatch({
      type: 'partycourse/fetchPartyList',
      payload: {
        limit: 20,
        page: 1,
      },
    });
    request('/api.monitor/data/pvuv', {
      method: 'GET',
      params:  {'date': '2021-5'}
    }).then((data) => {
      console.log(data);
    });

  }, []);
  // console.log(CoureseEnity[0].course_ppt)
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
            onClick={()=>setShowDetails(true)}
            key={item.title}
            actions={[
              <IconText
                icon={FilePptTwoTone}
               text={<span>{`${getLength(item.ppt)} 份`}</span>}
                key="list-vertical-message"
              />,
              <IconText icon =  {VideoCameraTwoTone} 
              text={`${getLength(item.video)} 个`}
              />,
              <IconText
                icon={DeleteTwoTone}
                text={
                  <span
                    onClick={() => {
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
            extra={<Image width={272} height={120} src={item.cover}
             fallback="https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.png" />}
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
      <ShowPartyDetails show={showDetails} onCloseDrawer={setShowDetails} />
    </PageContainer>
  );
};

export default connect(({ partycourse }: any) => ({
  CoureseEnity: get(partycourse, 'CoureseEnity', []),
  UploadStatus: get(partycourse, 'status', false),
}))(PartyCourseList);
