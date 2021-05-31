/*
 * @Author: your name
 * @Date: 2021-05-30 16:49:01
 * @LastEditTime: 2021-05-31 15:54:05
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

/*
集合对象 传入两个对象数组以及两个数组中各个对象需要匹配的字段
返回的是匹配之后的的对象数组
*/
export const ConBindObjArr = (MainObj:any,SlaveObj:any,MainAttr:string,SlaveAttr:string)=>{
  const CombindArr = MainObj.map((item:any, index: number)=>{
    const matchSlave  = SlaveObj.find((itemS:any)=>itemS[SlaveAttr]===item[MainAttr])
    return {'combineInfos':{...matchSlave}, ...item}
  })
  return CombindArr                        
}
