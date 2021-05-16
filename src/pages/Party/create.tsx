/*
 * @Author: your name
 * @Date: 2021-04-27 14:48:00
 * @LastEditTime: 2021-05-12 11:17:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/index.tsx
 */
import React,{ useState, useEffect } from 'react'
import { UploadAntd } from '@/utils/upload/qiniu'
import { PageContainer } from '@ant-design/pro-layout'
import { BookTwoTone, UserAddOutlined } from '@ant-design/icons'
import { Input, Button, message, Spin } from 'antd'
import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get } from 'lodash';
import './index.less'

interface PartyCourseProps {
    dispatch: Dispatch
}


const PartyShow: React.FC<PartyCourseProps> = (props)=>{

    const { dispatch, UploadStatus } = props
    const [ couseName, setCourseName ] = useState('')
    const [ courePerson, setCoursePerson ] = useState('admin')
    const [ coursePPT, setcoursePPT ] = useState('')
    const [ conrsePicture,setCousePicture ] = useState('')
    const [ courseVideo, setCourseVideo ] = useState('') 


    const handleSubmit: any = ()=>{
        if(!courePerson &&!conrsePicture&&!coursePPT&&!couseName&&!courseVideo){
            message.info('信息未填写完整请确认')
        }else{
        dispatch(
            {
                type: 'partycourse/addPartyCourse',
                payload: {
                    party_course_name: couseName,
                    party_course_person: courePerson,
                    party_course_ppt: coursePPT,
                    party_course_video: courseVideo
                }
                
            }
        )
        setCourseName('')
        setCoursePerson('')
        setCourseVideo('')
        setCousePicture('')
        setcoursePPT('')
        }
    }
   
    return (
        <PageContainer 
        >
            <Spin spinning={UploadStatus}>
        <section className="party_course_upload_containter">
        <Input placeholder="请输入课程名" style={{ width: 400 , marginBottom: '20px'}} onChange={
            (e) =>{
                setCourseName(e.target.value)
            }
        } 
        prefix={<BookTwoTone />}
        
        />
         <Input placeholder="课程教师" style={{ width: 400 , marginBottom: '20px'}} onChange={
            (e) =>{
                setCoursePerson(e.target.value)
            }
        } 
         prefix={<UserAddOutlined />}/>
        <UploadAntd 
          childFileType="picture"
          dragSize="90%"
          listshowType="picture"
          IntroText="上传课程封面"
          fileCount = {1}
          setUrl = {
            setCousePicture
          }
          />
           <UploadAntd 
           childFileType="ppt"
          dragSize="90%"
          listshowType="text"
          IntroText="上传课程ppt文件"
          fileCount={1}
          setUrl={setcoursePPT}
          />
           <UploadAntd 
           childFileType="video"
          dragSize="90%"
          listshowType="picture"
          IntroText="上传课程视频文件"
          fileCount={1}
          setUrl={
              setCourseVideo
          }
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
    UploadStatus: get(partycourse, 'status',false)
  }))(PartyShow);