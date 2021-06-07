/*
 * @Author: your name
 * @Date: 2021-06-07 15:54:00
 * @LastEditTime: 2021-06-07 16:01:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/Table/bills.ts
 */
import React from 'react'
import { Tag } from 'antd'

export  const statusStr = [
    { num: 0, str: <Tag>全部</Tag> },
    { num: 1, str: <Tag color="orange">待支付</Tag> },
    { num: 2, str: <Tag color="green">已支付</Tag> },
    { num: 4, str: <Tag color="red">已取消</Tag> },
    { num: undefined, str: '未知' },
  ];