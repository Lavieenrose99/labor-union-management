/*
 * @Author: your name
 * @Date: 2021-04-22 15:47:18
 * @LastEditTime: 2021-04-22 15:48:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/User/createLoginUser.tsx
 */
import React, { useState } from 'react';
import { Modal, Button, Form, Input, message, Result } from 'antd';
import { LabelFix } from '@/utils/public/text';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import request from '@/utils/request';


let codeValue = '';

const EmailCreater = (props)=>{
    const { ModalVisible, isShow } = props
    const [ emailVaild, setEmailVaild ] = useState('') 
    const [managerInfos, setManagerInfos] = useState({});
    const [ifCommit, setIfCommit] = useState(false)
    const handleOk = () => {
        request('/api.request/account/login/email_valid',{
            method: 'POST',
            data: {
              ...managerInfos,
              email: emailVaild
            }
        })
      isShow(false);
    };
    const handleCancel = () => {
      isShow(false);
    };
    const useCodeChange = (code) => {
    codeValue = code.manager_code
}
    const sendVaildCode = ()=>{
          console.log(emailVaild)
          request('/api.request/account/login/register_by_email',{
              method: 'POST',
              data: {
                email: emailVaild
              }
          })
    }
    const useManagerInfos = (values) => { 
        if(values.ensure_manager_code === values.password){
        
        setManagerInfos(values);
        message.success("创建成功")
        setIfCommit(true)
        }else{
            message.error("请检查两次输入的密码是否一致")
        }
      };
   return (
       
    <Modal title="用户注册" visible={ModalVisible} onOk={handleOk} onCancel={handleCancel}>{!ifCommit ? 
           <Form onFinish={useManagerInfos} onValuesChange={useCodeChange}>
        <Form.Item label={<LabelFix text="超级管理员邮箱" />} name="email">
          <Input style={{ width: '60%', marginRight: '20px' }}  onChange={(e)=>{
                 setEmailVaild(e.target.value)
          }}/>
          <Button onClick={sendVaildCode}>发送验证码</Button>
        </Form.Item>
        <Form.Item label={<LabelFix text="输入验证码" />} name="value">
          <Input style={{ width: '80%', marginRight: '20px' }} />
        </Form.Item>
        <Form.Item label={<LabelFix text="用户昵称" />} name="nickname">
          <Input style={{ width: '80%', marginRight: '20px' }} />
        </Form.Item>
        <Form.Item label={<LabelFix text="输入密码" />} name="password">
          <Input.Password style={{ width: '80%', marginRight: '20px' }}   
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
        </Form.Item>
        <Form.Item label={<LabelFix text="请确认密码密码" />} name="ensure_manager_code">
          <Input.Password style={{ width: '80%', marginRight: '20px' }}  
           iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
        </Form.Item>
        <Button htmlType="submit">申请注册</Button>
      </Form> : <Result status="success" subTitle="用户信息创建完成"/>
}
  </Modal>
   )
}

export default EmailCreater