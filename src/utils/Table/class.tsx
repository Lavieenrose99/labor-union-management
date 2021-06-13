/*
 * @Author: your name
 * @Date: 2021-06-13 23:07:28
 * @LastEditTime: 2021-06-14 01:50:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/Table/class.tsx
 */

import React from "react";
import moment from 'moment'


 export const Classcolumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
      title: '班级名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: '课程名称',
        dataIndex: 'class_course',
        render: (data: any)=>{
            return(
            <span>{data.name}</span>
            )
        }
      },
      {
          title: '教师名',
          dataIndex: 'teacher_name',
      },
    {
      title: '课程码',
      dataIndex: 'code',
      key: 'code',
    },
    {
        title: '开始时间',
        dataIndex: 'start_time',
        key: 'create_time',
        align: 'center' as 'center',
        render: (createTime: number) => (
          <span>{moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        ),
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        key: 'create_time',
        align: 'center' as 'center',
        render: (createTime: number) => (
          <span>{moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        ),
      },
  ];