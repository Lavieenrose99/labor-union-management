/*
 * @Author: SolitaryOrz
 * @Date: 2021-05-30 17:09:02
 * @Last Modified by: SolitaryOrz
 * @Last Modified time: 2021-05-31 15:18:19
 */

import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
import { PageContainer } from '@ant-design/pro-layout';
import { Select, Input, Table, Button } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';
import moment from 'moment';
import './index.less';

interface IOrdersType {
  dispatch: Dispatch;
  OrderEnity: any;
}

const OrdersList: React.FC<IOrdersType> = (props) => {
  const { dispatch, OrderEnity } = props;
  const { Option } = Select;
  const { Search } = Input;
  const listSelect = ['全部', '待支付', '已支付', '已取消'];
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderAuthorId, setOrderAnthorId] = useState(0);
  useEffect(() => {
    dispatch({
      type: 'ordermodel/fetchOrderList',
      payload: {
        limit: 99,
        page: 1,
        status: orderStatus,
      },
    });
  }, []);
  const statusStr = [
    { num: 0, str: '全部' },
    { num: 1, str: '待支付' },
    { num: 2, str: '已支付' },
    { num: 3, str: '已取消' },
    { num: undefined, str: '未知' },
  ];
  const columns = [];
  columns.push(
    {
      title: '订单编号',
      dataIndex: 'number',
      key: 'number',
      className: 'order-list-number',
      align: 'center' as 'center',
      width: 260,
    },
    {
      title: '用户id',
      dataIndex: 'account_id',
      key: 'account_id',
      align: 'center' as 'center',
      width: 140,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as 'center',
      width: 110,
      render: (statusNum: number) => (
        <span>{statusStr.find((item) => statusNum === item.num)?.str}</span>
      ),
    },
    {
      title: '购买数量',
      dataIndex: 'total',
      key: 'total',
      align: 'center' as 'center',
      width: 100,
    },
    {
      title: '总价',
      dataIndex: 'total_price',
      key: 'total_price',
      align: 'center' as 'center',
      width: 140,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center' as 'center',
      width: 240,
      render: (createTime: number) => (
        <span>{moment(createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      align: 'center' as 'center',
      width: 240,
      render: (updateTime: number) => (
        <span>{moment(updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'action',
      align: 'center' as 'center',
      render: (itemStatus: string, item: any) => (
        <Button
          onClick={() => {
            dispatch({
              type: 'ordermodel/cancelOrderEnity',
              payload: {
                params: {
                  limit: 99,
                  page: 1,
                  author_id: item,
                  status: orderStatus,
                  number: orderNumber,
                },
                id: item.id,
              },
            });
          }}
          disabled={item.status === 3}
        >
          取消订单
        </Button>
      ),
    },
  );
  return (
    <>
      <PageContainer title="订单列表" ghost={false} onBack={() => window.history.back()}>
        <div className="orders-features">
          <Select
            style={{
              width: 120,
            }}
            placeholder="选择订单..."
            onChange={(val: string) => {
              const res = statusStr.find((item) => val === item.str)?.num;
              setOrderStatus(res as number);
              dispatch({
                type: 'ordermodel/fetchOrderList',
                payload: {
                  limit: 99,
                  page: 1,
                  author_id: orderAuthorId,
                  status: res,
                  number: orderNumber,
                },
              });
            }}
          >
            {listSelect.map((item) => (
              <Option value={item} key={item}>{item}</Option>
            ))}
          </Select>
          <Search
            style={{
              maxWidth: 360,
              marginLeft: 60,
            }}
            placeholder="输入订单号"
            allowClear
            enterButton="搜索"
            onSearch={(item) => {
              setOrderNumber(item);
              console.log(item);
              dispatch({
                type: 'ordermodel/fetchOrderList',
                payload: {
                  limit: 99,
                  page: 1,
                  author_id: orderAuthorId,
                  status: orderStatus,
                  number: item,
                },
              });
            }}
          />
          <Search
            style={{
              maxWidth: 240,
              marginLeft: 60,
            }}
            placeholder="输入买家id"
            allowClear
            enterButton="搜索"
            onSearch={(item: string) => {
              setOrderAnthorId(parseInt(item, 10));
              console.log(item);
              dispatch({
                type: 'ordermodel/fetchOrderList',
                payload: {
                  limit: 99,
                  page: 1,
                  author_id: item,
                  status: orderStatus,
                  number: orderNumber,
                },
              });
            }}
          />
        </div>
        <div className="order-list">
          <Table
            columns={columns}
            dataSource={OrderEnity}
            onChange={() => {}}
            pagination={{
              style: { marginRight: 30 },
            }}
          />
        </div>
      </PageContainer>
    </>
  );
};

export default connect(({ ordermodel }: any) => ({
  OrderEnity: get(ordermodel, 'OrderEnity', []),
}))(OrdersList);
