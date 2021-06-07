/*
 * @Author: SolitaryOrz
 * @Date: 2021-05-30 17:09:02
 * @Last Modified by: SolitaryOrz
 * @Last Modified time: 2021-05-31 15:18:19
 */

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Select, Input, Table, Button, Image, Space, Avatar } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';
import { ConBindObjArr } from '@/utils/public/tools'
import { statusStr  } from '@/utils/Table/bills.tsx'
import moment from 'moment';
import './index.less';

interface IOrdersType {
  dispatch: Dispatch;
  OrderEnity: any;
  GoodsEnity: [];
}

const OrdersList: React.FC<IOrdersType> = (props) => {
  const { dispatch, OrderEnity, GoodsEnity } = props;
  const { Option } = Select;
  const { Search } = Input;
  const listSelect = ['全部', '待支付', '已支付', '已取消'];
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderAuthorId, setOrderAnthorId] = useState(0);
  const [ pageCurrent, setpageCurrent ] = useState(1);
  const ComBindData = ConBindObjArr(OrderEnity,GoodsEnity,'goods_id','id','goods')
  const AccountList = JSON.parse(sessionStorage.getItem('accountList')??'[]')
  const ComBindDataWithAcc = ConBindObjArr(ComBindData,AccountList,'account_id','id','account_infos') 
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
 
  const columns = [];
  columns.push(
    {
      title: '订单编号',
      dataIndex: 'number',
      key: 'number',
      className: 'order-list-number',
      align: 'center' as 'center',
   
    },
    {
      title: '用户',
      dataIndex: 'account_infos',
      key: 'account_id',
      align: 'center' as 'center',
      render: (account: any) =>{
        return(
          <Space>
        <Avatar src={account.avatar} />
        <span>{account.nickname}</span>
        </Space>
        )
      }
      
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as 'center',
     
      render: (statusNum: number) => (
        <span>{statusStr.find((item) => statusNum === item.num)?.str}</span>
      ),
    },
    {
      title: '商品',
      dataIndex: 'goods',
      key: 'total',
      align: 'center' as 'center',
    
      render: (item: any) => {
        return(
        <>
        <Space>
        <Image src={item.cover} width={40} height={40} />
        <span>{item.name}</span>
        </Space>
        </>
      )
      }
    },
    {
      title: '购买数量',
      dataIndex: 'total',
      key: 'total',
      align: 'center' as 'center',
   
    },
    {
      title: '总价',
      dataIndex: 'total_price',
      key: 'total_price',
      align: 'center' as 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center' as 'center',
      render: (createTime: number) => (
        <span>{moment(createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      align: 'center' as 'center',
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
              setpageCurrent(1)
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
              setpageCurrent(1)
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
              setpageCurrent(1)
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
            dataSource={ComBindDataWithAcc}
            onChange={() => {}}
            pagination={{
              style: { marginRight: 30 },
              current: pageCurrent,
              onChange: (page) => {
                setpageCurrent(page);
              }
            }}
          />
        </div>
      </PageContainer>
    </>
  );
};

export default connect(({ ordermodel, partycourse }: any) => ({
  OrderEnity: get(ordermodel, 'OrderEnity', []),
  GoodsEnity: get(partycourse, 'CourseGoods',[])
}))(OrdersList);
