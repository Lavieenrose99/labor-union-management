/*
 * @Author: your name
 * @Date: 2021-05-15 14:42:30
 * @LastEditTime: 2021-05-15 17:03:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/test/index.tsx
 */

import React, { useEffect, useState } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';
import { PageHeaderWrapper, PageContainer } from '@ant-design/pro-layout';
import { Button, Tag, List, Space } from 'antd';
import { PlusCircleTwoTone, SettingFilled } from '@ant-design/icons';
import { BASE_QINIU_URL } from '@/utils/upload/qiniu';
import moment from 'moment';
import { filterHTMLStr } from '@/utils/adjust_picture';
import './index.less';

interface INewtype {
  dispatch: Dispatch;
}

const NewSList: React.FC<INewtype> = (props) => {
  const { News } = props;
  console.log(News);
  useEffect(() => {
    props.dispatch({
      type: 'Testcourse/fetchTestList',
    });
  }, []);
  const [fakeData, setFakeData] = useState({
    content: '<p>hello world</p>',
    cover: 'picture-1609243131000',
    create: 1609231443,
    desc: '简介',
    id: 36,
    title: '标题',
  });

  const addFakeData = () => {
    props.dispatch({
      type: 'Testcourse/addTestList',
      payload: fakeData,
    });
  };

  return (
    <>
      <PageHeaderWrapper>
        <Button
          type="primary"
          style={{ margin: 20 }}
          onClick={addFakeData}
          icon={<PlusCircleTwoTone />}
        >
          添加资讯
        </Button>
        <Button
          type="primary"
          style={{ margin: 20 }}
          onClick={() => {
            setFakeData({
              content: '123412412421',
              cover: 'picture-1609243131000',
              create: 1609231443,
              desc: '简介',
              id: 1200,
              title: '标题',
            });
          }}
          icon={<SettingFilled />}
        >
          标签管理
        </Button>
        {/* 此处缺少横向栏 */}
        <div className="test-infos-container">
          <List
            className="test-infos-items"
            itemLayout="vertical"
            size="default"
            pagination={{
              onChange: (page) => {},
              pageSize: 5,
            }}
            dataSource={News}
            renderItem={(item) => (
              <List.Item
                className="test-infos-item"
                key={item.title}
                extra={
                  <>
                    <Space size="large">
                      <img
                        style={{ marginTop: 20 }}
                        width={80}
                        height={120}
                        alt="logo"
                        src={
                          item.cover
                            ? BASE_QINIU_URL + item.cover
                            : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                        }
                      />
                      <span>{moment(item.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
                      <Tag color="red">热门</Tag>
                      <div style={{ textAlign: 'right' }} />
                    </Space>
                  </>
                }
              >
                <List.Item.Meta
                  className="test-infos-item-meta"
                  title={<a href={item.href}>{item.title}</a>}
                  description={
                    <span className="info-show-text" onClick={() => {}}>
                      {filterHTMLStr(item.content)}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </PageHeaderWrapper>
    </>
  );
};

export default connect(({ Testcourse }: any) => ({
  News: get(Testcourse, 'CoureseEnity', []),
}))(NewSList);
