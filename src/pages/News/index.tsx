/*
 * @Author: your name
 * @Date: 2021-05-24 15:26:15
 * @LastEditTime: 2021-05-31 16:00:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/index.tsx
 */
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Modal, Button, Tag} from 'antd';
import type { Dispatch } from 'umi';
import InfosCreator from './create';
import TagsCreator from './tags_create';
import { connect } from 'umi';
import { get } from 'lodash';
import { BASE_QINIU_URL } from '@/utils/upload/qiniu';
import { filterHTMLStr } from '../../utils/adjust_picture';
import './index.less';
import NewsChange from './change';

interface INewsType {
  dispatch: Dispatch;
  NewsEnity: any;
  InfosTags: any;
}

const NewsList: React.FC<INewsType> = (props) => {
  const { dispatch, NewsEnity, InfosTags } = props;
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showChange, setShowChange] = useState(false);
  const [changeItem, setChangeItem] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddTagsModal, setShowTagsAddModal] = useState(false);
  const [tagSelect, setTagSelect] = useState<number>(0)
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
      type: 'setcentermodel/fetchInfosTagsList',
      payload: {
        limit: 99,
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
            创建资讯
          </Button>,
          <Button
            key="4"
            onClick={() => {
              setShowTagsAddModal(true);
            }}
          >
            创建标签
          </Button>,
        ]}
      >
        <div className="news-tags">
          <CheckableTag checked={tagSelect === 0}
            onClick={()=> setTagSelect(0)}
          >全部</CheckableTag>
          {
            InfosTags.map((item) => {
              return (
                <CheckableTag checked={tagSelect === item.id} 
                onClick={()=> setTagSelect(item.id)}>
                  {item.name}
                  </CheckableTag>
              )
            })
          }
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
                    src={item.picture? item.picture : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
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
                <article className="party_infos_content_preview">
                {filterHTMLStr(item.content)}
                </article>
              </List.Item>
            )}
          />
        </div>
        <Modal visible={showCreate} onCancel={() => setShowCreate(false)} width={400}></Modal>
        <NewsChange showModal={showChange} closeChangeModal={setShowChange} info={changeItem} />
      </PageContainer>
      <InfosCreator show={showAddModal} closeInfosModel={setShowAddModal} />
      <TagsCreator show={showAddTagsModal} closeInfosModel={setShowTagsAddModal} />
    </>
  );
};

export default connect(({ setcentermodel }: any) => ({
  NewsEnity: get(setcentermodel, 'NewsEnity', []),
  InfosTags: get(setcentermodel, 'InfosTags', []),
}))(NewsList);
