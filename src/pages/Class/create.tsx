/*
 * @Author: your name
 * @Date: 2021-05-25 13:50:27
 * @LastEditTime: 2021-06-18 13:01:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Class/create.tsx
 */
import React, { useRef, useEffect } from 'react';
import { Modal, Input, Select, Form, Button, DatePicker } from 'antd';
import { layout, tailLayout } from '@/utils/public/layout';
import { connect } from 'umi';
import moment from 'moment';
import type { Dispatch } from 'umi';
import { get } from 'lodash';

interface IClassType {
  dispatch: Dispatch;
  closeInfosModel: any;
  show: boolean;
  CoureseEnity: any;
  changeInfosProps?: any;
  clearChangeInfosProps?: any;
  changeType: string;
}

const ClassCreator: React.FC<IClassType> = (props) => {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const {
    show,
    closeInfosModel,
    dispatch,
    CoureseEnity,
    changeInfosProps,
    clearChangeInfosProps,
    changeType,
  } = props;
  useEffect(() => {
    if (changeInfosProps.class_course) {
      form.setFieldsValue({
        name: changeInfosProps.name ?? '',
        teacher_name: changeInfosProps.teacher_name ?? '',
        place: changeInfosProps.place ?? '',
        introduce: changeInfosProps.introduce ?? '',
        pid: changeInfosProps.class_course.id,
        comment: changeInfosProps.comment,
        begin_time: moment(
          moment(changeInfosProps.begin_time).format('YYYY-MM-DD HH:mm:ss'),
          'YYYY-MM-DD HH:mm:ss',
        ),
        end_time: moment(
          moment(changeInfosProps.end_time).format('YYYY-MM-DD HH:mm:ss'),
          'YYYY-MM-DD HH:mm:ss',
        ),
      });
    }
  }, [changeInfosProps]);
  const onFinish = async (values: any) => {
    const start_time = moment(values.start_time).valueOf();
    const end_time = moment(values.end_time).valueOf();
    const timestap = {
      start_time,
      end_time,
    };
    const newClass = { ...values, ...timestap };
    if (changeType === '创建') {
      await dispatch({
        type: 'partycourse/addPartyClass',
        payload: { data: newClass, id: values.pid },
      });
      closeInfosModel(false);
    } else if (changeType === '修改') {
      await dispatch({
        type: 'partycourse/changePartyClass',
        payload: { data: newClass, id: changeInfosProps.id },
      });
      closeInfosModel(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Modal
      visible={show}
      width={1000}
      onCancel={() => {
        closeInfosModel(false);
        clearChangeInfosProps({});
      }}
      destroyOnClose
      title="班级创建"
      footer={null}
    >
      <section>
        <Form
          {...layout}
          name="basic"
          ref={formRef}
          form={form}
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
            rules={[{ required: true, message: '请选择关联班级' }]}
          >
            <Select>
              {CoureseEnity.map((item) => {
                return <Select.Option value={item.id}>{item.name}</Select.Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="班级简介"
            name="introduce"
            // rules={[{ required: true, message: '请输入上课地点' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="班级备注" name="comment">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="begin_time"
            label="开始时间"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item
            name="end_time"
            label="结束时间"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </section>
    </Modal>
  );
};

export default connect(({ partycourse }: any) => ({
  CoureseEnity: get(partycourse, 'CoureseEnity', []),
}))(ClassCreator);
