/*
 * @Author: your name
 * @Date: 2021-05-30 17:23:24
 * @LastEditTime: 2021-06-16 15:40:12
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
  Select, 
  Drawer, 
  Descriptions, 
  Avatar, 
  Space , 
  Image} from 'antd'
import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get, cloneDeep } from 'lodash';
import { ifOn } from '@/utils/public/tools'
import './index.less'
import RichTextEditor from '@/utils/upload/richTextUpload';

interface PartyCourseProps {
    dispatch: Dispatch
    show: boolean
    UploadStatus: boolean
    GoodsList: [] 
    showInfos: {}
    onCloseDrawer: any
}


const PartyShowChange: React.FC<PartyCourseProps> = (props)=>{

  const { dispatch, show, onCloseDrawer , showInfos , GoodsList } = props
  const [ changeInfos, setChangeInfos ] = useState<boolean>(true)
  const [ changeInfosContent, setChangeInfosContent ] = useState(showInfos)
  const {  account_infos } = showInfos
  const { goods_infos, data } = changeInfosContent
  
  
    useEffect(()=>{
        dispatch({
            type: 'partycourse/fetchPartyGoodsList',
            payload: {
                limit: 10,
                page: 1
            }
        })
    },[])
    const OnListenPpt: any = (arr: [])=>{
      const CopyInfos = cloneDeep(changeInfosContent)
      CopyInfos.data.ppt = arr
      setChangeInfosContent(CopyInfos)
    }
    const OnListenVideo: any = (arr: [])=>{
      const CopyInfos = cloneDeep(changeInfosContent)
      CopyInfos.data.video = arr
      setChangeInfosContent(CopyInfos)
    }
    const OnListenCover: any = (arr: [])=>{
      const CopyInfos = cloneDeep(changeInfosContent)
      CopyInfos.course_cover = arr[0]
      setChangeInfosContent(CopyInfos)
    }

    const subscribeInfos = (text: any) => {
      const CopyInfos = cloneDeep(changeInfosContent)
      CopyInfos.course_work = text
      setChangeInfosContent(CopyInfos)
    };

    return (
      <>
        <Drawer
          title="课程详情"
          placement="right"
          destroyOnClose
          onClose={()=>{ onCloseDrawer(false);}}
          visible={show}
          width="60vw"
          footer={
            <>
              <Button
                size="large"
                disabled={changeInfos}
                type="primary"
                onClick={() => {
                  Modal.confirm({
                    title: 'DJ',
                    icon: <ExclamationCircleOutlined />,
                    content: '确认修改吗',
                    okText: '确认',
                    onOk: () => {
                      const { 
                        course_work, 
                        course_cover , 
                        course_brief, 
                        goods_infos, 
                        name, 
                        id, 
                        data }  = changeInfosContent
                      const { ppt, video }  = data
                      dispatch({
                        type: 'partycourse/putPartyCourse',
                        payload: {
                          aid: id,
                          data: {
                            party_course_name: name,
                            party_course_ppt: ppt,
                            party_course_video: video,
                            party_course_brief: course_brief,
                            party_course_cover: course_cover,
                            party_course_work: course_work,
                            good_id: goods_infos.id
                          }
                        },
                      });
                    },
                    cancelText: '取消',
                  });
                }}
              >
                提交
              </Button>
              {!changeInfos? (
                <Button
                  size="large"
                  icon={<SettingFilled />}
                  style={{  marginLeft: 10 }}
                  onClick={() => {
                    setChangeInfos(!changeInfos);
                  }
                }
                >
                  修改
                </Button>
              ) : (
                <Button
                  size="large"
                  icon={<div style={{ display: "inline-block" , marginRight: 10}}><SettingFilled spin={changeInfos} /></div>}
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    setChangeInfos(!changeInfos);
                  }}
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
                !changeInfos? changeInfosContent.name : <Input 
                  defaultValue={changeInfosContent.name} 
                  onChange={(e)=>{
                    const CopyInfos = cloneDeep(changeInfosContent)
                    CopyInfos.name = e.target.value
                    setChangeInfosContent(CopyInfos)
                  }} />
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
                    !changeInfos ? changeInfosContent.course_brief : <Input.TextArea  
                    defaultValue={changeInfosContent.course_brief} 
                    onChange={(e)=>{
                      const CopyInfos = cloneDeep(changeInfosContent)
                      CopyInfos.course_brief = e.target.value
                      setChangeInfosContent(CopyInfos)
                    }}/>
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
                {
                changeInfos? 
                <Select style={{ width: '20vw'}}  
                  placeholder="请选择更改的商品"
                  onChange={(e: string)=>{
                  const CopyInfos = cloneDeep(changeInfosContent)
                  CopyInfos.goods_infos = JSON.parse(e)
                  setChangeInfosContent(CopyInfos)
                }}  >
                  {
                    GoodsList.map((item)=>{
                      return(
                        <Select.Option value={JSON.stringify(item)}   >
                          {
                            <Space>
                            <Image src={item.cover} width={40} height={30}/>
                            <span>{item.name}</span>
                          {
                            ifOn(item.is_on)
                          }</Space>
                          }
                        </Select.Option>
                      )
                    })
                  }
              </Select> : null
}
              </Space> 
            }
            </Descriptions.Item>
            <Descriptions.Item span={2} label="课程ppt">
              {
                 changeInfos ? 
                 <section style={{ marginTop: 20}}>
                    <UploadAntd 
                       showType="drag"
                       propsFileArr={data.ppt}
                       setUrl={OnListenPpt}
                       fileCount={3}
                       listshowType="text"
                       childFileType="ppt"
                    />
                 </section> :
                data.ppt.map((item: string,index: number)=>{
                  return(
                  <section><FilePptTwoTone twoToneColor="red"/>{`  党课ppt文件${index+1}   `}<a href={item}>点击下载</a></section>
                  )
                })
              }
            </Descriptions.Item>
            <Descriptions.Item span={2} label="课程视频">
              {
                changeInfos ? 
                <section style={{ marginTop: 20}}>
                   <UploadAntd 
                      showType="drag"
                      propsFileArr={data.video}
                      setUrl={OnListenVideo}
                      fileCount={3}
                      listshowType="picture"
                      childFileType="video"
                   />
                </section> :
                data.video.map((item: string,index: number)=>{
                  return(
                  <section><VideoCameraTwoTone />{`  党课视频文件${index+1}   `}<a href={item}>点击下载</a></section>
                  )
                })
              }
            </Descriptions.Item>
            <Descriptions.Item  label="课程作业" span={2}>{
              !changeInfos ? 
              <div dangerouslySetInnerHTML={{ __html: changeInfosContent.course_work }}></div> : 
              <RichTextEditor 
              subscribeRichText={subscribeInfos} 
              defaultText={changeInfosContent.course_work}
              />
            }
            </Descriptions.Item>
            <Descriptions.Item label="封面图片" span={2}>
              {  !changeInfos?
                <Image  src={changeInfosContent.course_cover} width={400} height={400} /> : 
                <UploadAntd 
                showType="normal"
                propsFileItem={changeInfosContent.course_cover}
                setUrl={OnListenCover}
                fileCount={1}
                listshowType="picture-card"
                childFileType="picture"
             />
              }
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