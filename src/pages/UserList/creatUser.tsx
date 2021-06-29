import React, { useState } from 'react';
import { Modal, Button, Form, Input, message, Result } from 'antd';
import { LabelFix } from '@/utils/public/text';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import request from '@/utils/request';


let codeValue = '';

const EmailCreater = (props)=>{
    const { ModalVisible, isShow } = props
    const [ emailVaild, setEmailVaild ] = useState('') 
    const [managerInfos, setManagerInfos] = useState({});
    const [ifCommit, setIfCommit] = useState(false)
    const handleOk = () => {
        // request('/api.request/v1/account/login/email_valid',{
        //     method: 'POST',
        //     data: {
        //       ...managerInfos,
        //       email: emailVaild
        //     }
        // })
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
          // request('/api.request/v1/account/login/register_by_email',{
          //     method: 'POST',
          //     data: {
          //       email: emailVaild
          //     }
          // })
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
          <Form.Item label={<LabelFix text="E-mail"/>} 
                     name="email"
                     rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input style={{ width: '80%', marginRight: '20px' }} />
          </Form.Item>
          <Form.Item label={<LabelFix text="密码" />} 
                     name="password"
                     rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password style={{ width: '80%', marginRight: '20px' }}   
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
          </Form.Item>
          <Form.Item label={<LabelFix text="确认密码" />} 
                     name="ensure_manager_code"
                     rules={[{ required: true, message: '请确认密码' }]}
          >
            <Input.Password style={{ width: '80%', marginRight: '20px' }}  
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
          <Form.Item label={<LabelFix text="昵称" />} 
                     name="nickname"
                     rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input style={{ width: '80%', marginRight: '20px' }} />
          </Form.Item>
          <Form.Item label={<LabelFix text="验证码" />} 
                     name="value"
                     rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input style={{ width: '45%', marginRight: '10px' }} />
            <Button onClick={sendVaildCode}>获取验证码</Button>
          </Form.Item>
          <Button htmlType="submit" type="primary" style={{marginLeft:'200px'}}>注册</Button>
        </Form> : <Result status="success" subTitle="用户信息创建完成"/>
    }
  </Modal>
   )
}

export default EmailCreater