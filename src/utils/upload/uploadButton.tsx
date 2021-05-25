/*
 * @Author: your name
 * @Date: 2021-05-24 16:17:28
 * @LastEditTime: 2021-05-24 16:17:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/upload/uploadButton.tsx
 */
import React from 'react';
import {
  UploadOutlined,
} from '@ant-design/icons';

export const  EditorLayout = {
  wrapperCol: {
    offset: 4,
    // span: 8,
  },
};
export const  EditorGoodsLayout = {
  wrapperCol: {
    offset: 1,
  },
};

export const tailLayout = {
  wrapperCol: {
    offset: 9,
    span: 16,
  },
};

export const layout = {
  labelCol: {
    offset: 4,
  },
  wrapperCol: {
    span: 12,
  },
};

export const ModelListlayout = {
  labelCol: {
    offset: 0,
  },
};

export const layoutCourse = {
  labelCol: {
    offset: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

export const uploadButton = (
  <div>
    <div className="ant-upload-text">
      <UploadOutlined />
      上传
    </div>
  </div>
);
