/*
 * @Author: your name
 * @Date: 2021-05-08 17:39:34
 * @LastEditTime: 2021-05-09 00:01:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/upload/previewModal.tsx
 */
import React from 'react'
import { Modal, Image } from 'antd'

interface IFilePreview{
    url: string
    show: boolean
    type: string
    close: Function
}

const PreviewModal: React.FC<IFilePreview> = (props)=>{
    const { url , show, close , type }  = props
    if(type === 'picture'){
    return (
        <Modal title="文件预览" visible={show} onCancel={()=>close(false)} onOk={()=>close(false)} >
            <section style={{ textAlign:"center" }}>
           <Image
           width={400}
           src={url}
           />
           </section>
      </Modal>
    )
    }if(type === 'video'){
        return(
        <Modal title="文件预览" visible={show} onCancel={()=>close(false)} onOk={()=>close(false)} >
        <section style={{ textAlign:"center" }}>
       <video src={url} width={400} controls={true} ></video>
       </section>
  </Modal>
        )
        
    }
    
        // window.location.href=url
        return null
    
    
}

export default PreviewModal

