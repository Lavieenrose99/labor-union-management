/*
 * @Author: your name
 * @Date: 2021-05-30 17:23:24
 * @LastEditTime: 2021-06-05 17:29:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/change.tsx
 */
/*
 * @Author: your name
 * @Date: 2021-04-27 14:48:00
 * @LastEditTime: 2021-05-30 17:23:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/index.tsx
 */
import React,{ useState, useEffect } from 'react'
import { UploadAntd } from '@/utils/upload/qiniu'
import { FilePptTwoTone, 
  VideoCameraTwoTone,
  ExclamationCircleOutlined,
  SettingFilled } from '@ant-design/icons'
import { Input, 
  Modal,
  Button, 
  message, 
  Spin, 
  Select, 
  Drawer, 
  Descriptions, 
  Avatar, 
  Space , 
  Tag, 
  Image} from 'antd'
import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get  } from 'lodash';
import { ifOn } from '@/utils/public/tools'
import CreatorPartyCourse from '@/utils/upload/richTextUpload'
import './index.less'

interface PartyCourseProps {
    dispatch: Dispatch
    show: boolean
    UploadStatus: boolean
    GoodsList: [] 
    showInfos: {}
    onCloseDrawer: any
}


const PartyShowChange: React.FC<PartyCourseProps> = (props)=>{

  const { dispatch, show, onCloseDrawer , showInfos } = props
  const { goods_infos, account_infos, data } = showInfos
  
    useEffect(()=>{
        dispatch({
            type: 'partycourse/fetchPartyGoodsList',
            payload: {
                limit: 10,
                page: 1
            }
        })
    },[])
    return (
      <>
        <Drawer
          title="课程详情"
          placement="right"
          onClose={()=>onCloseDrawer(false)}
          visible={show}
          width="60vw"
          footer={
            <>
              <Button
                // disabled={changeContent.role === 0 || changeInfos}
                type="primary"
                onClick={() => {
                  Modal.confirm({
                    title: 'wzlz',
                    icon: <ExclamationCircleOutlined />,
                    content: '确认保存吗',
                    okText: '确认',
                    onOk: () => {
                      dispatch({
                        type: 'account/adjustAccountInfos',
                        payload: {
                          // aid: content.id,
                          // content: changeContent,
                        },
                      });
                    },
                    cancelText: '取消',
                  });
                }}
              >
                提交
              </Button>
              {true? (
                <Button
                  icon={<SettingFilled />}
                  style={{ float: 'right' }}
                  // onClick={() => {
                  //   setChangeInfos(!changeInfos);
                  //   setChangeContent({
                  //     motto: changeContent?.motto || (content?.motto ?? ''),
                  //     nickname: changeContent?.nickname || (content?.nickname ?? ''),
                  //     role: changeContent?.role || (content?.role ?? 0),
                  //   } as ChangeInfosType);
                  // }}
                >
                  设置
                </Button>
              ) : (
                <Button
                  icon={<SettingFilled />}
                  style={{ float: 'right' }}
                  // onClick={() => {
                  //   setChangeInfos(!changeInfos);
                  // }}
                >
                  保存
                </Button>
              )}
            </>
          }
          footerStyle={{ backgroundColor: '#f0f2f5' }}
          headerStyle={{ backgroundColor: '#f0f2f5' }}
        >
        <Descriptions column={2} bordered size="middle">
            <Descriptions.Item label="课程名称">
              {
                showInfos.name
              }
            </Descriptions.Item>
          <Descriptions.Item label="创建人">
            {
              <Space>
              <Avatar src={account_infos.avatar}/>
              <span>{account_infos.nickname}</span>
              </Space>
            }
            </Descriptions.Item>
            <Descriptions.Item label="课程简介" span={2} style={{ minWidth: '7vw' }}>
                <section>
                  {
                    showInfos.course_brief
                  }
                </section>
            </Descriptions.Item>
            <Descriptions.Item label="关联商品" span={2}>
            {
              <Space size="large">
                  <Image src={goods_infos.cover} width={40} height={30}/>
                  <span>{goods_infos.name}</span>
                {
                  ifOn(goods_infos.is_on)
                }
              </Space>
            }
            </Descriptions.Item>
            <Descriptions.Item span={1} label="课程ppt">
              {
                data.ppt.map((item: string,index: number)=>{
                  return(
                  <section><FilePptTwoTone twoToneColor="red"/>{`  党课ppt文件${index+1}   `}<a href={item}>点击下载</a></section>
                  )
                })
              }
            </Descriptions.Item>
            <Descriptions.Item span={1} label="课程视频">
              {
                data.video.map((item: string,index: number)=>{
                  return(
                  <section><VideoCameraTwoTone />{`  党课视频文件${index+1}   `}<a href={item}>点击下载</a></section>
                  )
                })
              }
            </Descriptions.Item>
            <Descriptions.Item  label="课程作业" span={2}>
              <div dangerouslySetInnerHTML={{ __html: showInfos.course_work }}></div>
            </Descriptions.Item>
            <Descriptions.Item label="封面图片" span={2}>
                <Image  src={showInfos.course_cover} />
            </Descriptions.Item>
        </Descriptions>
        </Drawer>
      </>
    );
}



export default connect(({ partycourse }: any) => ({
    CoureseEnity: get(partycourse, 'CoureseEnity', []),
    UploadStatus: get(partycourse, 'status',false),
    GoodsList: get(partycourse,'CourseGoods',[])
  }))(PartyShowChange);