/*
 * @Author: your name
 * @Date: 2021-04-27 14:48:00
 * @LastEditTime: 2021-06-01 21:13:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/index.tsx
 */
import React,{ useState, useEffect } from 'react'
import { UploadAntd } from '@/utils/upload/qiniu'
import { PageContainer } from '@ant-design/pro-layout'
import { BookTwoTone } from '@ant-design/icons'
import { Input, Button, message, Spin, Select } from 'antd'
import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get, map } from 'lodash';
import CreatorPartyCourse from '@/utils/upload/richTextUpload'
import './index.less'

interface PartyCourseProps {
    dispatch: Dispatch
    UploadStatus: boolean
    GoodsList: []
}


const PartyShow: React.FC<PartyCourseProps> = (props)=>{

  const { dispatch, UploadStatus, GoodsList  } = props
  const  { Option } = Select
    useEffect(()=>{
        dispatch({
            type: 'partycourse/fetchPartyGoodsList',
            payload: {
                limit: 10,
                page: 1
            }
        })
    },[])

    const courseCoverS = localStorage.getItem("courseCover") ? map([...JSON.parse(String(localStorage.getItem("courseCover")))],'url') : []
    const pptStorage = localStorage.getItem("pptStorage") ? map([...JSON.parse(String(localStorage.getItem("pptStorage")))],'url') : []
    const videoStorage = localStorage.getItem("videoStorage") ? map([...JSON.parse(String(localStorage.getItem("videoStorage")))],'url') : []
    const [ couseName, setCourseName ] = useState('')
    const [ courePerson, setCoursePerson ] = useState('admin')
    const [ coursePPT, setcoursePPT ] = useState(pptStorage)
    const [ courseVideo, setCourseVideo ] = useState(videoStorage) 
    const [ coursebrief, setCourseBrief ] = useState('测试简介')
    const [ courseCover, setCourseCover ] = useState(courseCoverS)
    const [ linkGoods, setLinkGoods ] = useState(0)
    const [ courseWork, setCourseWork ] = useState(localStorage.getItem('partyCourseInfos'))
    const handleSubmit: any = ()=>{
        if(!courePerson &&!coursePPT&&!couseName&&!courseVideo){
            message.info('信息未填写完整请确认')
        }else{
        dispatch(
            {
                type: 'partycourse/addPartyCourse',
                payload: {
                    party_course_name: couseName,
                    party_course_person: courePerson,
                    party_course_ppt: coursePPT,
                    party_course_video: courseVideo,
                    party_course_brief: coursebrief,
                    party_course_cover: courseCover[0],
                    party_course_work: courseWork,
                    good_id: linkGoods
                }
                
            }
        )
        setCourseName('')
        setCoursePerson('')
        setCourseVideo([])
        setcoursePPT([])
        localStorage.removeItem('partycourseinfos')
        }
    }
    const subscribeInfos = (text: any) => {
        localStorage.setItem('partyCourseInfos', text);
        setCourseWork(text)
      };
    return (
        <PageContainer 
        extra={[
            <Button key="3" onClick={()=>localStorage.clear()}>清除缓存</Button>
          ]}
        >
            <Spin spinning={UploadStatus}>
        <section className="party_course_upload_containter">
        <Input placeholder="请输入课程名" style={{ width: '20vw' , marginBottom: '20px'}} onChange={
            (e) =>{
                setCourseName(e.target.value)
            }
        } 
        prefix={<BookTwoTone />}
        
        />
            <Select 
            className="party_goods_select"
            onChange={(e: number)=>setLinkGoods(e)} 
            placeholder="课程关联产品"  >
                {
                    GoodsList.map((item: any)=>{
                        return (
                            <Option value={item.id}>
                                {
                                    item.name
                                }
                            </Option>
                        )
                    })
                }
        </Select>
         <Input.TextArea 
         maxLength={130}
         placeholder="请在此填写课程简介130字以内" 
         style={{ width: 700 , marginBottom: '20px'}} onChange={
            (e) =>{
                setCourseBrief(e.target.value)
            }
        } />
    
        <UploadAntd 
          fileStorage="courseCover"
          showType="drag"
          childFileType="picture"
          dragSize="70vw"
          listshowType="picture"
          IntroText="上传课程封面"
          fileCount = {3}
          setUrl = {
            setCourseCover
          }
          />
           <UploadAntd
           fileStorage="pptStorage" 
           showType="drag"
           childFileType="ppt"
          dragSize="70vw"
          listshowType="text"
          IntroText="上传课程ppt文件"
          fileCount={1}
          setUrl={setcoursePPT}
          />
           <UploadAntd 
           fileStorage="videoStorage"
           showType="drag"
           childFileType="video"
          dragSize="70vw"
          listshowType="picture"
          IntroText="上传课程视频文件"
          fileCount={3}
          setUrl={
              setCourseVideo
          }
          />

          <CreatorPartyCourse 
          subscribeRichText={subscribeInfos} 
          defaultText={courseWork}
          />
          </section>
        
          </Spin>
         <Button 
         className="submit_party_btn"
         onClick={
              handleSubmit
          }>确认</Button>
         </PageContainer>
    )
}



export default connect(({ partycourse }: any) => ({
    CoureseEnity: get(partycourse, 'CoureseEnity', []),
    UploadStatus: get(partycourse, 'status',false),
    GoodsList: get(partycourse,'CourseGoods',[])
  }))(PartyShow);
