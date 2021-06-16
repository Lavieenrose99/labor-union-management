import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { 
  List, 
  Avatar, 
  Modal, 
  Button, 
  Image,
  Radio, 
  Table,
  Space
} from 'antd';
import {  DeleteTwoTone } from '@ant-design/icons';
import { 
  ConBindObjArr, 
  ifAccountExist, 
  IconText, 
  IconFont,
  judegePush
} from '@/utils/public/tools.tsx'
import { CourseColumns } from '@/utils/Table/course'
import ShowPartyDetails from './change'
import CreatePartyCourse from './create';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';

interface PartyCourseProps {
  dispatch: Dispatch;
  CoureseEnity: any;
  CourseGoods: any;
  UserInfos: any;
  AccountList: any;
  pageTotal: any;
}

const PartyCourseList: React.FC<PartyCourseProps> = (props) => {
  const { dispatch, CoureseEnity, CourseGoods,  pageTotal } = props;
  const [ showCreate, setShowCreate] = useState<boolean>(false);
  const [ showDetails, setShowDetails ] = useState<boolean>(false);
  const [ showDetailsInfos, setShowDetailsInfos ] = useState<any>({});
  const  [pageSize, setPageSize] = useState(5);
  const  [pageCurrent, setpageCurrent] = useState(1);
  const partyCourseList = ConBindObjArr(CoureseEnity,CourseGoods,'goods_id','id','goods_infos')
  const AccountList = JSON.parse(sessionStorage.getItem('accountList')??'[]')
  const partyCourseListWAcc = ConBindObjArr(partyCourseList,AccountList,'account_id','id','account_infos') 
  const [ showWays, setShowWays ] = useState<number>(2)
  
  useEffect(() => {
    dispatch({
      type: 'partycourse/fetchPartyGoods',
      payload: {
        limit: 20,
        page: 1
      }
    })


 }, []);
 useEffect(() => {
  dispatch({
    type: 'partycourse/fetchPartyList',
    payload: {
      limit: 20,
      page: 1,
    },
  });
}, []);

  const tableSet = { 
    title: '操作',
    render: (_: any,record: any)=>{
      return(
        <Space size="large">
        <Button 
        type="primary"
        onClick={()=>{
          setShowDetails(!showDetails); 
          setShowDetailsInfos(record)}}
        >查看详情</Button>
        <Button 
         danger
         onClick={() => {
          Modal.info({
            title: '惠福管理后台',
            content: '确认要删除该课程吗',
            okText: '确认',
            onOk: () => {
              dispatch({
                type: 'partycourse/delPartyCourse',
                payload: record.id,
              });
            },
            closable: true,
          });
        }}
       >删除班级</Button>
        </Space>
      )
    }
  }
  
  const columns = judegePush(CourseColumns,tableSet)
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
         <section className="party_class_switch" style={{ marginBottom: 20}} >
          <Radio.Group
            defaultValue={showWays}
            onChange={
               
                (e) => {
                  setShowWays(e.target.value); 
                }
} 
          >
            <Radio.Button value={1}>
              <IconFont type="icon-liebiao" style={{ marginRight: 4 }} />
              列表
            </Radio.Button>
            <Radio.Button value={2}>
              <IconFont type="icon-biaoge" style={{ marginRight: 4 }} />
              表格
            </Radio.Button>
          </Radio.Group>
        </section>
      <section className="party_course_container">
      { showWays ===1 ?
        <div className="party_course_list">
      <List
        bordered
        itemLayout="vertical"
        size="large"
        pagination={{
          total: pageTotal,
          pageSize,
          onShowSizeChange: (current, size) => {
             setPageSize(size);
            },
           onChange: (page, size) => {
          setpageCurrent(page);
          dispatch({
           type: 'partycourse/fetchPartyList',
           payload: {
             page,
             limit: size, 
           },
         });
       },
       showTotal: (total) => `第 ${pageCurrent} 页 共 ${total} 条`,
        }}
        dataSource={partyCourseListWAcc}
        footer={
          <div>
            <b>全国总工会</b> 惠福党建中心
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <section onClick={()=>{setShowDetails(true); setShowDetailsInfos(item)}}>
              <IconText
              icon={<IconFont type="icon-chakan" />}
               text={<span>查看详情</span>}
            /></section>,
              <IconText
              icon={<DeleteTwoTone twoToneColor="red"/>}
                text={
                  <span
                    className="action-click"
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
            extra={<Image width={272} height={120} src={item.course_cover}
             fallback="https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.png" />}
          >
            <List.Item.Meta
              avatar={<Avatar src='https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.jpeg' />}
              title={<a >{ `党建系列课 ${item.name}`}</a>}
              description={ <div>
                <strong>创建人: </strong>
                <span>{ifAccountExist(item.account_infos.nickname)}</span>
              </div>}
            />
            {<section
              className="action-click party_course_acticle"
              style={{marginLeft: 60, maxHeight: '2.5vw', overflow: 'hidden'}}
              onClick={()=>{setShowDetails(true); setShowDetailsInfos(item)}}
              >
              <strong >{item.course_brief}</strong></section>}
          </List.Item>
        )}
      />
      </div>
      : <section className="party_course_table">
         <Table dataSource={partyCourseListWAcc} columns={columns} />
      </section>
}       
      </section> 

      <Modal visible={showCreate} onCancel={() => setShowCreate(false)} width='88vw' footer={null} >
        <CreatePartyCourse />
      </Modal>
      <section>{
        showDetails ? 
      <ShowPartyDetails show={showDetails} onCloseDrawer={setShowDetails} showInfos={showDetailsInfos} /> :null
        }
      </section>

    </PageContainer>
  );
};

export default connect(({ partycourse }: any) => ({
  CoureseEnity: get(partycourse, 'CoureseEnity', []),
  UploadStatus: get(partycourse, 'status', false),
  CourseGoods: get(partycourse,'CourseGoods',[]),
  pageTotal: get(partycourse,'pagination',0)
  // AccountList: get(partyaccount,'AccountInfos',[]),
  // UserInfos: get(partyaccount,'UserInfos',{})
}))(PartyCourseList);
