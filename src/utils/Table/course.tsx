/*
 * @Author: your name
 * @Date: 2021-06-16 10:50:07
 * @LastEditTime: 2021-06-16 13:57:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/Table/course.tsx
 */

import React from "react";
import moment from 'moment'


 export const CourseColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
    },
    {
        title: '创建人',
        dataIndex: 'account_infos',
        render: (data: any)=>{
            return(
            <span>{data.nickname}</span>
            )
        }
      },
      {
          title: '关联商品',
          dataIndex: 'goods_infos',
          render: (data: any)=>{
              return (
              <span>{data.name || '暂无商品信息'}</span>
              )
          }
      },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center' as 'center',
        render: (createTime: number) => (
          <span>{moment(createTime*1000).format('YYYY-MM-DD HH:mm:ss')}</span>
        ),
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'create_time',
        align: 'center' as 'center',
        render: (createTime: number) => (
          <span>{moment(createTime*1000).format('YYYY-MM-DD HH:mm:ss')}</span>
        ),
      },
  ];