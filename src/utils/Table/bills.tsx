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
  { num: 0, str: '全部' },
  { num: 1, str: '待支付', color: 'orange' },
  { num: 2, str: '已支付', color: 'green' },
  { num: 4, str: '已取消', color: 'red' },
  { num: undefined, str: '未知' },
];