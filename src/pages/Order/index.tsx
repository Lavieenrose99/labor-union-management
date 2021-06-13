/*
 * @Author: SolitaryOrz
 * @Date: 2021-05-30 17:09:02
 * @Last Modified by: SolitaryOrz
 * @Last Modified time: 2021-06-13 16:53:47
 */

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Select, Input, Table, Button, Image, Space, Avatar, Tag } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';
import { ConBindObjArr } from '@/utils/public/tools'
import { statusStr  } from '@/utils/Table/bills'
import moment from 'moment';
import './index.less';

interface IOrdersType {
  dispatch: Dispatch;
  OrderEnity: any;
  GoodsEnity: [];
  OrderTotal: number;
}

const OrdersList: React.FC<IOrdersType> = (props) => {
  const { dispatch, OrderEnity, GoodsEnity, OrderTotal } = props;
  const { Option } = Select;
  const { Search } = Input;
  const listSelect = ['全部', '待支付', '已支付', '已取消'];
  const [orderStatus, setOrderStatus] = useState(0); // 订单状态，用于筛选
  const [orderNumber, setOrderNumber] = useState(''); // 订单编号，用于筛选
  const [orderAuthorId, setOrderAnthorId] = useState(0); // 买家id，用于筛选
  const [ pageSize, setPageSize ] = useState(10); // 每页条数
  const [ pageCurrent, setPageCurrent ] = useState(1); // 当前页数
  const ComBindData = ConBindObjArr(OrderEnity,GoodsEnity,'goods_id','id','goods')
  const AccountList = JSON.parse(sessionStorage.getItem('accountList')??'[]')
  const ComBindDataWithAcc = ConBindObjArr(ComBindData,AccountList,'account_id','id','account_infos') 
  useEffect(() => {
    dispatch({
      type: 'ordermodel/fetchOrderList',
      payload: {
        limit: pageSize,
        page: pageCurrent,
        status: orderStatus,
      },
    });
  }, []);
  console.log(AccountList);
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
        <span>{account.nickname} ({account.email})</span>
        </Space>
        )
      }
    },
    {
      title: '商品名称',
      dataIndex: 'goods',
      key: 'total',
      align: 'center' as 'center',
    
      render: (item: any) => {
        return(
          <>
            <Space>
              <span>{item.name}</span>
            </Space>
          </>
      )
      }
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as 'center',
     
      render: (statusNum: number) => {
        const statusItem = statusStr.find((item) => statusNum === item.num)
        return <Tag color={statusItem?.color}>{statusItem?.str}</Tag>
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
    // {
    //   title: '操作',
    //   dataIndex: 'status',
    //   key: 'action',
    //   align: 'center' as 'center',
    //   render: (itemStatus: string, item: any) => (
    //     <Button
    //       onClick={() => {
    //         dispatch({
    //           type: 'ordermodel/cancelOrderEnity',
    //           payload: {
    //             params: {
    //               limit: pageSize,
    //               page: pageCurrent,
    //               author_id: item,
    //               status: orderStatus,
    //               number: orderNumber,
    //             },
    //             id: item.id,
    //           },
    //         });
    //       }}
    //       disabled={item.status === 3}
    //     >
    //       取消订单
    //     </Button>
    //   ),
    // },
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
              setPageCurrent(1)
              dispatch({
                type: 'ordermodel/fetchOrderList',
                payload: {
                  limit: pageSize,
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
            placeholder="不知道会不会有订单号查询接口，先写着"
            allowClear
            enterButton="搜索"
            onSearch={(item) => {
              setOrderNumber(item);
              setPageCurrent(1)
              dispatch({
                type: 'ordermodel/fetchOrderList',
                payload: {
                  limit: pageSize,
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
              maxWidth: 320,
              marginLeft: 60,
            }}
            placeholder="输入买家邮箱（有奇怪的数据）"
            allowClear
            enterButton="搜索"
            onSearch={(val: string) => {
              const author = AccountList.find((item) => val === item.email)
              setOrderAnthorId(parseInt(author || val === '' ? author?.id : -1, 10));
              setPageCurrent(1)
              dispatch({
                type: 'ordermodel/fetchOrderList',
                payload: {
                  limit: pageSize,
                  page: 1,
                  author_id: author || val === '' ? author?.id : -1,
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
              pageSize,
              total: OrderTotal,
              onChange: (page, size) => {
                setPageCurrent(page);
                dispatch({
                  type: 'ordermodel/fetchOrderList',
                  payload: {
                    page,
                    limit: size,
                    author_id: orderAuthorId,
                    status: orderStatus,
                    number: orderNumber,
                  },
                })
              },
              onShowSizeChange: (current, size) => {
                setPageSize(size);
              },
              showTotal: total => <span>共{total}份订单</span>
            }}
          />
        </div>
      </PageContainer>
    </>
  );
};

export default connect(({ ordermodel, partycourse }: any) => ({
  OrderEnity: get(ordermodel, 'OrderEnity', []),
  GoodsEnity: get(partycourse, 'CourseGoods',[]),
  OrderTotal: get(ordermodel, 'OrderTotal', 0)
}))(OrdersList);
