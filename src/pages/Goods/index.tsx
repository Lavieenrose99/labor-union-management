
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Table, Image, Space } from 'antd';
import type { Dispatch } from 'umi';
import GoodsCreator from './create';
import GoodsChanger from './change';
import { connect } from 'umi';
import { get } from 'lodash';
import moment from 'moment';
import './index.less';

interface IGoodsType {
  dispatch: Dispatch;
  CourseGoods: any;
}

const GoodsList: React.FC<IGoodsType> = (props) => {
  const { dispatch, CourseGoods } = props;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [changeItem, setChangeItem] = useState({});
  useEffect(() => {
    dispatch({
      type: 'partycourse/fetchPartyGoods',
      payload: {
        limit: 20,
        page: 1,
      },
    });
  }, []);
  const columns = [
    {
      title: '商品编号',
      dataIndex: 'id',
      key: 'key',
      align: 'center' as 'center',
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: (itemName: string, item: any) => (
        <Space>
          <Image width={60} height={30} src={item.cover} />
          <span>{itemName}</span>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'is_on',
      key: 'is_on',
      align: 'center' as 'center',
      render: (itemIsOn: boolean) => <span>{itemIsOn ? '上架中' : '未上架'}</span>,
      filters: [
        {
          text: '未上架',
          value: 'false',
        },
        {
          text: '上架中',
          value: 'true',
        },
      ],
      onFilter: (value: string, record: any) => record.is_on.toString().indexOf(value) === 0,
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (itemPrice: number) => <span>￥{itemPrice}</span>,
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      key: 'inventory',
      sorter: (a: any, b: any) => a.inventory - b.inventory,
    },
    {
      title: '购买人数',
      dataIndex: 'people',
      key: 'people'
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (updateTime: number) => (
        <span>{moment(updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
      sorter: (a: any, b: any) => a.update_time - b.update_time,
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      align: 'center' as 'center',
      render: (itemId: number, itemVal: any) => (
        <div>
          <Button
            style={{
              margin: '0 10px',
            }}
            onClick={() => {
              setChangeItem(itemVal);
              setShowChangeModal(true);
            }}
          >修改信息</Button>
          <Button
            style={{
              margin: '0 10px',
            }}
            type="primary"
            disabled={itemVal.is_on === true}
            onClick={() => {
              dispatch({
                type:'partycourse/PutOnPartyGoods',
                payload: {
                  params: {
                    is_on: true,
                  },
                  updateId: itemId
                }
              })
            }}
          >上架商品</Button>
          <Button
            style={{
              margin: '0 10px',
            }}
            type="primary"
            danger
            disabled={itemVal.is_on === false}
            onClick={() => {
              dispatch({
                type: 'partycourse/deletePartyGoods',
                payload: itemVal.id,
              });
            }}
          >下架商品</Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <PageContainer
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="3" onClick={() => setShowAddModal(true)}>
            新增商品
          </Button>,
        ]}
      >
        <div className="goods-table">
          <Table
            columns={columns}
            dataSource={CourseGoods}
            onChange={() => {}}
            pagination={{
              style: { marginRight: 30 },
            }}
          />
        </div>
      </PageContainer>
      <GoodsCreator
        show={showAddModal}
        closeInfosModel={setShowAddModal}
        StroageCover="goodCover"
        StroagePictures="goodsPictures"
      />
      <GoodsChanger
        show={showChangeModal}
        closeInfosModel={setShowChangeModal}
        StroageCover="goodCover"
        StroagePictures="goodsPictures"
        info={changeItem}
      />
    </>
  );
};

export default connect(({ partycourse }: any) => ({
  CourseGoods: get(partycourse, 'CourseGoods', []),
}))(GoodsList);
