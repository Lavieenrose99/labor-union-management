/*
 * @Author: your name
 * @Date: 2021-04-27 16:57:12
 * @LastEditTime: 2021-06-04 17:15:13
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
import ImgCrop from 'antd-img-crop'; 
import { uploadButton } from './uploadButton'
import { judgeNullForUpload } from '@/utils/public/tools.tsx'
import { map } from 'lodash'

const QINIU_SERVER = 'https://upload-z2.qiniup.com';
const BASE_QINIU_URL = 'http://qiniu.fmg.net.cn/';

type large = '60vw'
type middle = '50vw'
interface UploadAntdProps extends UploadTextProps{
    listshowType: "picture" | "text" | "picture-card" 
    dragSize?: large | middle
    childFileType: 'ppt' | 'picture' | 'video'
    fileCount: 1 | 2 | 3
    setUrl?: any
    showType?: 'drag' | 'normal'
    fileStorage?: string
    propsFileArr?: []
    propsFileItem?: string
}
interface UploadTextProps{
     IntroText?: string
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

const pictureSize = {
  rolling: 16 / 9,
  cover: 37.5 / 22.5,
  home_rolling: 37.5 / 22.5,
};

// 该函数对于使用场景必须指定
const UploadAntd: React.FC<UploadAntdProps> = (props)=>{
    const { 
      listshowType, 
      dragSize, 
      IntroText, 
      childFileType, 
      fileCount, 
      setUrl, 
      showType, 
      fileStorage, // 缓存文件
      propsFileItem, // 单个url的文件
      propsFileArr // 文件数组 
    } = props
    const storageType = localStorage.getItem(fileStorage||'') ? [...JSON.parse(String(localStorage.getItem(fileStorage||'')))] : [] // 走缓存用这里
    const propsType = (propsFileArr ??[]).map((item: any)=>{
      const url = item
      return(
        { url }
      )
    })
    const [qiniuToken, setQiniuToken] = useState<string>("");
    const [fileList, setFileList] = useState<any>(judgeNullForUpload(storageType,propsType,propsFileItem));
    const [uploading, setUploading] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [preViewShow, setPreViewShow] = useState<boolean>(false);
    const [suffixPoint, setSuffixPoint] = useState('')

    const getQiNiuToken: any = () => {
        request('/api.farm/goods/resources/qiniu/upload_token', {
          method: 'GET',
        }).then(
          (response) => {
            setQiniuToken(response.token);
          }
        );
      };
      const getQiNiuTokenDirect: any = async() => {
        await request('/api.farm/goods/resources/qiniu/upload_token', {
          method: 'GET',
        }).then(
          (response) => {
            setQiniuToken(response.token);
          }
        );
        return true
      };
      const storeUploadFile: any = (file: any)=>{
        if(fileList.length + 1 > fileCount){
          message.info(`只能上传${fileCount}份文件`)
           return false
        }
        const suffix = file.name.substring(file.name.lastIndexOf('.')+1).toLowerCase()
        setSuffixPoint(suffix)
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
    
    const uploadOrder: any = (fileItem: File,index: number)=> {
      
      const uploadItem = new FormData();
      uploadItem.append('action', 'z2');
      uploadItem.append('token', qiniuToken);
      uploadItem.append('file', fileItem);
      uploadItem.append('key', `muti-${(new Date()).valueOf()}.${suffixPoint}`);
      setUploading(true)
      request(QINIU_SERVER, {
        credentials: 'omit',
        method: 'POST',
        data: uploadItem,
      }).then(
        (response) => {
         message.success(`${response.key}上传成功`)
         setPreviewUrl(`http://qiniu.fmg.net.cn/${response.key}`)
         const fileCopy = fileList
         fileCopy[index].url= `http://qiniu.fmg.net.cn/${response.key}`
         const urls = map(fileCopy,'url')
         setUrl(urls)
         setFileList(fileCopy)
         localStorage.setItem(fileStorage, JSON.stringify(fileList));
         setUploading(false)
        }
      );

    }

    const handleChange = ({ file  }: any) => {
      const {
        uid, name, type, thumbUrl, status, response = {},
      } = file;
      const fileItem = {
        uid,
        name,
        type,
        thumbUrl,
        status,
        response,
        index: fileList.length,
        judege: (response.key || ''),
        url: BASE_QINIU_URL + (response.key),
      };
  
      if (fileItem.judege.length !== 0) {
        fileList.pop();
        fileList.pop();
        fileList.push(fileItem);
      } else if (fileItem.status !== 'error') {
        fileList.push(fileItem);
      }
      setFileList([...fileList]);
      localStorage.setItem(fileStorage, JSON.stringify(fileList));
      const urls = map(fileList,'url')
      setUrl(urls)
      
      
    };

    const handleUpload: any = async()=>{
        let index = 0
        await fileList.forEach((fileItem: File)=>{
          uploadOrder(fileItem,index)
          index+=1
        })
        
    }
    const onRemoveItem: any = (target: number)=>{
      const pos = fileList.indexOf(target)
      const newFileList = fileList
      const filteredFile = newFileList.splice(pos,1)
      message.info(`${filteredFile[0].name}已移除`)
      setFileList(newFileList)
    }

    const JudgeUploadType: any = (type: string)=>{
        if(type === 'drag'){
          return(
   <div onClick={getQiNiuToken}>
      <section  style={{ width: dragSize , marginBottom: '30px'}}>
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
           (originNode, file ) => {
             return (
               <div onClick={()=>setPreviewUrl(file.url??'')} >
                 {
               originNode
                 }
                 {
                   (childFileType === 'ppt' && file.url ) ? <a  download={file.url} href={file.url} >点击下载</a>: null
                 }
                 {
                   (childFileType === 'video' && file.url) ? <strong  >👆点击预览</strong>: null
                 }
                  {
                   (childFileType === "picture" && file.url) ? <strong  >👆点击预览</strong>: null
                 }
                 </div>
             
             )
           }
        }
        >
           <UploadText  IntroText={IntroText}/>
       </Dragger>
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
</div>
          )
        }if(type === 'normal'){
          return(
           <>
            <ImgCrop aspect={pictureSize.rolling} grid>
                <Upload
                  action={QINIU_SERVER}
                  data={{
                    token: qiniuToken,
                    key: `picture-${Date.parse(new Date())}`,
                  }}
                  listType="picture-card"
                  beforeUpload={getQiNiuTokenDirect}
                  fileList={fileList}
                  onChange={handleChange}
                >
                  {
                    fileList.length === fileCount ? null : uploadButton
                  }
                </Upload>
              </ImgCrop>
           </>
          )
        }
    }

    return (
      <>{
          JudgeUploadType(showType)
      }
       <PreviewModal show={preViewShow} url = {previewUrl}  close={setPreViewShow} type={childFileType} />
       </>
    )
    }



export {
    QINIU_SERVER, BASE_QINIU_URL,UploadText,UploadAntd, fileType, pictureSize
}

