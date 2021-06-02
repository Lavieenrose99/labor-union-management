/*
 * @Author: your name
 * @Date: 2021-05-30 16:49:01
 * @LastEditTime: 2021-06-02 15:10:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/public/tools.ts
 */
import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import { Space, Tag } from 'antd'
import { sum, map } from 'lodash'

export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2580518_szvm4a1dx2.js',
});

export const getLength = (arr:any) => {
     let len = arr ? arr.length : 0
     return len
 } 

export const IconText = ({ icon, text }) => (
  <Space>
    {icon??null}
    {text}
  </Space>
);

export const FinalPvUvAmount = (arr:[]) =>{
  // const UvSum = sum(map(arr,'uv'))
  const PvSum  =sum(map(arr,'pv'))
  return{
    // 'uvSum': UvSum,
    'pvSum': PvSum
  }
}

/*
集合对象 传入两个对象数组以及两个数组中各个对象需要匹配的字段,最后一个参数是新的集合属性名
返回的是匹配之后的的对象数组
*/
export const ConBindObjArr = (MainObj:any,SlaveObj:any,MainAttr:string,SlaveAttr:string,AttrName: string)=>{
  const CombindArr = MainObj.map((item:any, index: number)=>{
    const matchSlave  = SlaveObj.find((itemS:any)=>itemS[SlaveAttr]===item[MainAttr])
    return { [AttrName] :{...matchSlave}, ...item}
  })
  return CombindArr                        
}

export const ifOn = (ifValue:boolean) =>{
return ifValue ? <Tag color="green">已上架</Tag>:<Tag color="red">未上架</Tag>
}

export const ifAccountExist = (value: string)=>{
  return value ? value : '用户已注销'
}
