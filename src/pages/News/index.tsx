/*
 * @Author: your name
 * @Date: 2021-05-24 15:26:15
 * @LastEditTime: 2021-06-16 13:59:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/index.tsx
 */
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Modal, Button, Tag, Image} from 'antd';
import type { Dispatch } from 'umi';
import InfosCreator from './create';
import TagsCreator from './tags_create';
import { connect } from 'umi';
import { get } from 'lodash';
import { filterHTMLStr } from '../../utils/adjust_picture';
import './index.less';
import NewsChanger from './change';
import { DeleteTwoTone } from '@ant-design/icons';


interface INewsType {
  dispatch: Dispatch;
  NewsEnity: any;
  InfosTags: any;
  pageNum: any;
}

const NewsList: React.FC<INewsType> = (props) => {
  const { dispatch, NewsEnity, InfosTags,  pageNum } = props;
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showChange, setShowChange] = useState(false);
  const [changeItem, setChangeItem] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddTagsModal, setShowTagsAddModal] = useState(false);
  const [tagSelect, setTagSelect] = useState<number>(0)

  const  [pageSize, setPageSize] = useState(5);
  const  [pageCurrent, setPageCurrent] = useState(1);
  const { CheckableTag } = Tag;



  useEffect(() => {
    dispatch({
      type: 'setcentermodel/fetchNewsList',
      payload: {
        limit: pageSize,
        page: pageCurrent,
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
            onClick={()=> {
              setTagSelect(0);
              setPageCurrent(1);
              dispatch({
                type: 'setcentermodel/fetchNewsList',
                payload: {
                  page: 1,
                  limit: pageSize, 
                  news_label_id: 0
                },
              })}}
          >全部</CheckableTag>
          {
            InfosTags.map((item: any) => {
              return (
                <CheckableTag checked={tagSelect === item.id} 
                onClick={()=> {
                  setTagSelect(item.id);
                  setPageCurrent(1);
                  dispatch({
                    type: 'setcentermodel/fetchNewsList',
                    payload: {
                      page: 1,
                      limit: pageSize,
                      news_label_id: item.id
                    },
                  })}}>
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
               total: pageNum,
               current: pageCurrent,
               pageSize,
               onShowSizeChange: (current, size) => {
                  setPageSize(size);
                 },
                onChange: (page, size) => {
               setPageCurrent(page);
               dispatch({
                type: 'setcentermodel/fetchNewsList',
                payload: {
                  page,
                  limit: size,
                  news_label_id: tagSelect
                },
              });
            },
            showTotal: (total) => `第 ${pageCurrent} 页 共 ${total} 条`,
          }}
            dataSource={NewsEnity}
            footer={
              <div>
                <b>全国总工会</b> 惠福党建中心
              </div>
            }
            renderItem={(item: any) => (
              <List.Item
                key={item.id}
                extra={
                  <Image
                    width={160}
                    height={100}
                    src={item.picture? item.picture : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
                  />
                }
                actions={[
                  <span
                    className="action-click"
                    onClick={() => {
                      Modal.info({
                        title: '惠福管理后台',
                        content: '确认要删除该资讯吗',
                        okText: '确认',
                        onOk: () => {
                          dispatch({
                            type: 'setcentermodel/deleteNewsEnity',
                            payload: item.id
                          })
                        },
                        closable: true,
                      });
                    }}
                    >
                    <DeleteTwoTone twoToneColor="#ff0000" /> 删除资讯
                  </span>
                ]}
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                />
                <article    
                  onClick={() => {
                    setShowChange(true);
                    setChangeItem(item);
                  }}
                  className="news-content action-click">
                {filterHTMLStr(item.content)}
                </article>
              </List.Item>
            )}
          />
        </div>
        <Modal visible={showCreate} onCancel={() => setShowCreate(false)} width={400}></Modal>
        <NewsChanger showModal={showChange} closeChangeModal={setShowChange} info={changeItem} />
      </PageContainer>
      <InfosCreator show={showAddModal} closeInfosModel={setShowAddModal} CoverStroage="newsCover" />
      <TagsCreator show={showAddTagsModal} closeInfosModel={setShowTagsAddModal} />
    </>
  );
};

export default connect(({ setcentermodel }: any) => ({
  NewsEnity: get(setcentermodel, 'NewsEnity', []),
  InfosTags: get(setcentermodel, 'InfosTags', []),
  pageNum: get(setcentermodel,'pagination',0)
}))(NewsList);
