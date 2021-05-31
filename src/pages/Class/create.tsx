/*
 * @Author: your name
 * @Date: 2021-05-25 13:50:27
 * @LastEditTime: 2021-05-30 17:48:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Class/create.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Form,  Button, DatePicker } from 'antd';
import { layout, tailLayout } from '@/utils/public/layout'
import { connect } from 'umi';
import moment from 'moment'
import type { Dispatch } from 'umi';
import { get } from 'lodash'

interface IClassType {
    dispatch: Dispatch;
    closeInfosModel: any;
    show: boolean;
    CoureseEnity: any
}

const ClassCreator: React.FC<IClassType> = (props)=>{

    const { show, closeInfosModel, dispatch, CoureseEnity} = props
    const onFinish = (values: any) => {
        const start_time =  moment(values.start_time).valueOf();
        const end_time = moment(values.end_time).valueOf();
        const timestap = {
          start_time, end_time,
        };
        const newClass = { ...values, ...timestap};
        dispatch({
            type: 'partycourse/addPartyClass',
            payload: { data: newClass, id: values.pid } 
        })
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      }
    console.log(CoureseEnity)
    useEffect(()=>{
        dispatch({
            type: 'partycourse/fetchPartyList',
            payload: {
                limit: 99,
                page:1
            }
        })
    },[])
    return (
        <Modal visible={show} 
        width={1000} 
        onCancel={()=>closeInfosModel(false)}
        destroyOnClose
        title="班级创建">
            <section>
            <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        <Form.Item
            label="班级名称"
            name="name"
            rules={[{ required: true, message: '请完整课程名称' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
            label="教师名称"
            name="teacher_name"
            rules={[{ required: true, message: '请输入教师名称' }]}
              >
                <Input />
              </Form.Item>
      <Form.Item
        label="上课地点"
        name="place"
        rules={[{ required: true, message: '请输入上课地点' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
         label="关联课程"
         name="pid"
        >
            <Select>
                {
                    CoureseEnity.map((item)=>{
                        return(
                            <Select.Option value={item.id}>
                                {
                                    item.name
                                }
                            </Select.Option>
                        )
                    })
                }
            </Select>
        </Form.Item>
        <Form.Item
        label="课程简介"
        name="introduce"
        rules={[{ required: true, message: '请输入上课地点' }]}
      >
        <Input.TextArea />
        </Form.Item>
        <Form.Item
        label="课程备注"
        name="comment"
        rules={[{ required: true, message: '' }]}
      >
        <Input.TextArea />
        </Form.Item>
                <Form.Item
                  name="begin_time"
                  label="开始时间"
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                  />
                </Form.Item>
                <Form.Item
                  name="end_time"
                  label="结束时间"
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                  />
                </Form.Item>
      <Form.Item {...tailLayout}>
        <Button  htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
            </section>
        </Modal>

    )
}

export default connect( ({  partycourse }: any)=> (
  {
    CoureseEnity: get(partycourse, 'CoureseEnity', []),
  }
))(ClassCreator)
