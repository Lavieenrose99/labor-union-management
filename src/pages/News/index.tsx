/*
 * @Author: your name
 * @Date: 2021-05-24 15:26:15
 * @LastEditTime: 2021-05-24 15:56:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/index.tsx
 */
import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Avatar, Space, Modal, Button, Image, Tag } from 'antd';
import { FilePptTwoTone, DeleteTwoTone, PlusCircleOutlined } from '@ant-design/icons';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';
import { BASE_QINIU_URL } from '@/utils/upload/qiniu';
import { filterHTMLStr } from '../../utils/adjust_picture';
import './index.less';
import NewsChange from './change';

interface INewsType {
  dispatch: Dispatch;
  NewsEnity: any;
  LabelList: any;
}

const NewsList: React.FC<INewsType> = (props) => {
  const { dispatch, NewsEnity, LabelList } = props;
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showChange, setShowChange] = useState(false);
  const [changeItem, setChangeItem] = useState({});
  const { CheckableTag } = Tag;
  useEffect(() => {
    dispatch({
      type: 'setcentermodel/fetchNewsList',
      payload: {
        limit: 20,
        page: 1,
      },
    });
    dispatch({
      type: 'setcentermodel/getNewsLabelList',
      payload: {
        limit: 20,
        page: 1,
      },
    });
  }, []);
  console.log('index: NewsEnity: ' + NewsEnity);
  console.log('index: LabelList: ' + LabelList);
  return (
    <>
      <PageContainer
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="3" onClick={() => setShowCreate(true)}>
            创建资讯
          </Button>,
        ]}
      >
        <div className="news-tags">
          <PlusCircleOutlined
            style={{ marginRight: 20 }}
            onClick={() => {
              setShowCreateTag(true);
            }}
          />
          <CheckableTag checked={true}>全部</CheckableTag>
          <CheckableTag checked={false}></CheckableTag>
        </div>
        <div className="news-list">
          <List
            style={{ padding: '20px 40px' }}
            bordered
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={NewsEnity}
            footer={
              <div>
                <b>全国总工会</b> 惠福党建中心
              </div>
            }
            renderItem={(item) => (
              <List.Item
                key={item.id}
                extra={
                  <img
                    style={{ marginTop: 20 }}
                    width={160}
                    height={100}
                    src={
                      item.picture
                        ? BASE_QINIU_URL + item.picture
                        : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                    }
                  />
                }
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={
                    <span
                      onClick={() => {
                        setShowChange(true);
                        setChangeItem(item);
                      }}
                    >
                      {item.introduction}
                    </span>
                  }
                />
                {filterHTMLStr(item.content)}
              </List.Item>
            )}
          />
        </div>
        <Modal visible={showCreateTag} onCancel={() => setShowCreateTag(false)} width={400}></Modal>
        <Modal visible={showCreate} onCancel={() => setShowCreate(false)} width={400}></Modal>
        <NewsChange showModal={showChange} closeChangeModal={setShowChange} info={changeItem} />
      </PageContainer>
    </>
  );
};

export default connect(({ setcentermodel }: any) => ({
  NewsEnity: get(setcentermodel, 'NewsEnity', []),
  LabelList: get(setcentermodel, 'LabelList', []),
}))(NewsList);
