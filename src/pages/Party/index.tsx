import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Avatar, Modal, Button, Image } from 'antd';
import { FilePptTwoTone, DeleteTwoTone, VideoCameraTwoTone } from '@ant-design/icons';
import { getLength, ConBindObjArr, ifAccountExist, IconText} from '@/utils/public/tools.tsx'
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
}

const PartyCourseList: React.FC<PartyCourseProps> = (props) => {
  const { dispatch, CoureseEnity, CourseGoods } = props;
  const [ showCreate, setShowCreate] = useState<boolean>(false);
  const [ showDetails, setShowDetails ] = useState<boolean>(false);
  const [ showDetailsInfos, setShowDetailsInfos ] = useState<any>({});
  const partyCourseList = ConBindObjArr(CoureseEnity,CourseGoods,'goods_id','id','goods_infos')
  const AccountList = JSON.parse(sessionStorage.getItem('accountList')??'[]')
  const partyCourseListWAcc = ConBindObjArr(partyCourseList,AccountList,'account_id','id','account_infos') 
  console.log(partyCourseListWAcc)
  
  useEffect(() => {
    dispatch({
      type: 'partycourse/fetchPartyList',
      payload: {
        limit: 20,
        page: 1,
      },
    });
    dispatch({
      type: 'partycourse/fetchPartyGoods',
      payload: {
        limit: 20,
        page: 1
      }
    })


 }, []);
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
      <section className="party_course_container">
        <div className="party_course_list">
      <List
        bordered
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
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
              <IconText
                icon={<FilePptTwoTone twoToneColor="red" />}
                text={<span>{`${getLength(item.data.ppt)} 份`}</span>}
                key="list-vertical-message"
              />,
              <IconText 
              icon =  {<VideoCameraTwoTone twoToneColor="red"  />} 
              text={`${getLength(item.data.video)} 个`}
              />,
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
      </section> 

      <Modal visible={showCreate} onCancel={() => setShowCreate(false)} width='88vw' >
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

export default connect(({ partycourse, partyaccount }: any) => ({
  CoureseEnity: get(partycourse, 'CoureseEnity', []),
  UploadStatus: get(partycourse, 'status', false),
  CourseGoods: get(partycourse,'CourseGoods',[]),
  // AccountList: get(partyaccount,'AccountInfos',[]),
  // UserInfos: get(partyaccount,'UserInfos',{})
}))(PartyCourseList);
