/*
 * @Author: your name
 * @Date: 2021-04-27 16:57:12
 * @LastEditTime: 2021-05-10 16:47:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/upload/qiniu.tsx
 */
import React, { useState } from 'react'
import { Upload, Button, message } from 'antd'
import {
  InboxOutlined,
} from '@ant-design/icons';
import PreviewModal from './previewModal'
import request from '@/utils/request'

const QINIU_SERVER = 'http://upload-z2.qiniup.com';
const BASE_QINIU_URL = 'http://qiniu.fmg.net.cn/';

type large = '90%'
type middle = '50%'
interface UploadAntdProps extends UploadTextProps{
    listshowType: "picture" | "text" | "picture-card" 
    dragSize: large | middle
    childFileType: 'ppt' | 'picture' | 'video'
    fileCount: 1 | 2 | 3
    setUrl: any
}
interface UploadTextProps{
     IntroText: string
     IntroIcon?: string 
}

const fileType = {
  ppt: ['ppt','pptx'],
  picture: ['jpeg','png','jpg','webp'],
  video: ['mp4']
}
const UploadText: React.FC<UploadTextProps> = (props) => {
    const { IntroText, IntroIcon  } = props

    return (
      <>
      <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">{IntroText}</p>
    <p className="ant-upload-hint">
     请点击上传或者将文件拖到区域内上传
    </p>
    </>
  );
}

const { Dragger } = Upload


const UploadAntd: React.FC<UploadAntdProps> = (props)=>{
    const { listshowType, dragSize, IntroText, childFileType, fileCount, setUrl } = props
    const [qiniuToken, setQiniuToken] = useState<string>("");
    const [fileList, setFileList] = useState<any>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [preViewShow, setPreViewShow] = useState<boolean>(false);
   

    const getQiNiuToken: any = () => {
        request('/api.farm/goods/resources/qiniu/upload_token', {
          method: 'GET',
        }).then(
          (response) => {
            setQiniuToken(response.token);
          }
        );
      };
      const storeUploadFile: any = (file: any)=>{
        if(fileList.length + 1 > fileCount){
          message.info(`只能上传${fileCount}份文件`)
           return false
        }
        const suffix = file.name.substring(file.name.lastIndexOf('.')+1).toLowerCase()
        if(fileType[childFileType].indexOf(suffix) !== -1){
        setFileList([...fileList,file])
        }else{  
          // eslint-disable-next-line no-param-reassign
          file.status = 'error'
          setFileList([...fileList,file])
          message.info(`请检查上传文件是否是${JSON.stringify(fileType[childFileType])}`)
        }
        return false
       
      }
    
    const uploadOrder: any = (fileItem: File)=> {
      
      const uploadItem = new FormData();
      uploadItem.append('action', 'z2');
      uploadItem.append('token', qiniuToken);
      uploadItem.append('file', fileItem);
      uploadItem.append('key', `muti-${fileItem.name}`);
      setUploading(true)
      request(QINIU_SERVER, {
        credentials: 'omit',
        method: 'POST',
        data: uploadItem,
      }).then(
        (response) => {
         message.success(`${response.key}上传成功`)
         setPreviewUrl(`http://qiniu.fmg.net.cn/${response.key}`)
         const fileCopy = {...fileList[0]}
         fileCopy.url= `http://qiniu.fmg.net.cn/${response.key}`
         setUrl(`http://qiniu.fmg.net.cn/${response.key}`)
         setFileList([fileCopy])
         setUploading(false)
        }
      );

    }

    const handleUpload: any = ()=>{
        fileList.forEach(async(fileItem: File)=>{
            uploadOrder(fileItem)
        })
    }
    const onRemoveItem: any = (target: number)=>{
      const pos = fileList.indexOf(target)
      const newFileList = fileList
      const filteredFile = newFileList.splice(pos,1)
      message.info(`${filteredFile[0].name}已移除`)
      setFileList(newFileList)
    }

    return (
      <>
      <section  style={{ width: dragSize , marginBottom: '30px'}}>
      <div onClick={getQiNiuToken}>
        <Dragger
         listType={listshowType}
         action={QINIU_SERVER}
         beforeUpload={storeUploadFile}
         onRemove={onRemoveItem}
         fileList={[...fileList]}
         onPreview={
          ()=>{
            setPreViewShow(true)
          }
         }
         itemRender={
          	(originNode, file, fileList) => {
              return (
                <div>
                  {
                originNode
                  }
                  {
                    (childFileType === 'ppt' && previewUrl) ? <a  download={previewUrl} href={previewUrl} >点击下载</a>: null
                  }
                  {
                    (childFileType === 'video' && previewUrl) ? <strong  >👆点击预览</strong>: null
                  }
                   {
                    (childFileType === "picture" && previewUrl) ? <strong  >👆点击预览</strong>: null
                  }
                  </div>
              
              )
            }
         }
         >
            <UploadText  IntroText={IntroText}/>
        </Dragger>
        </div>
         <Button
         style={{ width: '100%' , marginTop: '10px'}}
         type="primary"
         size="small"
         onClick={handleUpload}
         disabled={fileList.length === 0 || (fileList[0].url)}
         loading={uploading}
       >
         {uploading ? '上传当中' : '开始上传'}
       </Button>
        {fileList.length !== 0 ? <div> { !fileList[0].url ? "文件未上传" : "文件已上传"} </div>:null}
       </section>
       <PreviewModal show={preViewShow} url = {previewUrl}  close={setPreViewShow} type={childFileType} />
       </>
    )
}

export {
    QINIU_SERVER, BASE_QINIU_URL,UploadText,UploadAntd, fileType
}

