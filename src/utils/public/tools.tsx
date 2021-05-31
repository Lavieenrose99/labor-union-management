/*
 * @Author: your name
 * @Date: 2021-05-30 16:49:01
 * @LastEditTime: 2021-05-30 20:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/public/tools.ts
 */
import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd'

export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2580517_aygv90p5lh.js',
});

export const getLength = (arr:any) => {
     let len = arr ? arr.length : 0
     return len
 } 

export const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
);
