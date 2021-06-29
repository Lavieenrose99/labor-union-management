import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Input, Table, Button, Space, Avatar } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import UserCreator from './creatUser';
import { get } from 'lodash';
import './index.less';
import { ConBindObjArr } from '@/utils/public/tools';

interface UsersType {
  dispatch: Dispatch;
  OrderEnity: any;
  UsersEnity: [];
}


const UsersList: React.FC<UsersType> = (props) => {
  const { dispatch} = props;
  const { Search } = Input;
  const [showAddModal,setShowAddModal] = useState(false);
  const [userId, setUserId] = useState(0);
  const [ pageCurrent, setpageCurrent ] = useState(1);
  const AccountList = JSON.parse(sessionStorage.getItem('accountList')??'[]') 
  const ComBindDataWithAcc = ConBindObjArr(AccountList,AccountList,'id','id','account_infos') 

  useEffect(() => {
    dispatch({
      type: 'partyaccount/getAccountList',
      payload: {
        limit: 99,
        page: 1,
      },
    });
  }, []);
  // console.log(AccountList);
  // console.log(ComBindDataWithAcc);
  const columns = [];
  // columns = AccountList.map(item => ({}))
  columns.push(
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as 'center',
    },
    {
      title: '用户',
      dataIndex: 'account_infos',
      key: 'account_infos',
      align: 'center' as 'center',
      render: (account: any) =>{
        // console.log(account);
        return(
          <Space>
        <Avatar src={account.avator} />
        <span>{account.nickname}</span>
        </Space>
        )
      }
      
    },
    {
      title: 'e-mail',
      dataIndex: 'email',
      key: 'email',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'action',
      align: 'center' as 'center',
      render: (item: any) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            dispatch({
              type: '',
              payload:{
                params: {
                  limit: 99,
                  page: 1,
                  author_id: item,
                },
                id: item.id,
              },

            })
          }}
        >
          删除用户
        </Button>
      ),
    },
  );
  // console.log(columns);
  return (
    <>
      <PageContainer title="用户列表" ghost={false} onBack={() => window.history.back()}>
        <div className="users-features">
        <Button
              type="primary"
              style={{
                margin: 20,
              }}
              icon={<PlusCircleTwoTone />}
              onClick={() => { setShowAddModal(true) }}
            >
              添加用户    
        </Button>
          <Search
            style={{
              margin:20,
              maxWidth: 240,
              marginLeft: 60,
            }}
            placeholder="输入用户id"
            allowClear
            enterButton="搜索"
            onSearch={(item: string) => {
              setUserId(parseInt(item, 10));
              setpageCurrent(1)
              dispatch({
                type: 'account/fetchAccountList',
                payload: {
                  limit: 99,
                  page: 1,
                  id: item, 
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
      <UserCreator
        show={showAddModal}
        closeInfosModel={setShowAddModal}
        StroageCover="userCover"
        StroagePictures="userPictures"
        />
      
    </>
  );
};

export default connect(({ account }: any) => ({
  UsersList: get(account, 'AccountList', []),
}))(UsersList);
 