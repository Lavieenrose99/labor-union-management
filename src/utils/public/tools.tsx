/*
 * @Author: your name
 * @Date: 2021-05-30 16:49:01
 * @LastEditTime: 2021-06-04 17:14:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/public/tools.ts
 */
import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import { Space, Tag } from 'antd'
import { sum, map, groupBy, flatten } from 'lodash'

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
//计算数据中总共的pvuv
export const FinalPvUvAmount = (arr:[]) =>{
  const PvSum  =sum(map(arr,'pv'))
  return{
    // 'uvSum': UvSum,
    'pvSum': PvSum
  }
}
//分组计算pvuv
export const PvUvGroupByDate = (arr: [])=>{
  let dataSet:any = []
  arr.forEach((item:{})=>{
      let dateInfos: any = Object.values(item)[0]
      let GrouByDay = sum(map(dateInfos,'pv'))
      dataSet.push({
        date: Object.keys(item)[0],
        value: GrouByDay,
        name: 'pv(访问量)'
      })
  })
  return dataSet
}
//按顺序排列
export const PvUvGroupByUrls = (arr: [])=>{
  const DateGroupByUrls: { name: string; value: number; uv: number }[] = []
  const DateGroupByUrlsRaw = groupBy(arr,'name')
  const DateGroupByUrlsData = Object.values(DateGroupByUrlsRaw)
  const DataGroupByUrlsName = Object.keys(DateGroupByUrlsRaw)
  DateGroupByUrlsData.forEach((item,index)=>{
        DateGroupByUrls.push({
          name: DataGroupByUrlsName[index],
          value: sum(map(item,'pv')),
          uv: 2,
        })
  })
  return DateGroupByUrls
  
}
//时段urls对比
export const PvUvCompareByUrls = (arr: [])=>{
  const DateGroupByUrlsRaw = groupBy(arr,'name')
  const DateGroupByUrlsData = Object.values(DateGroupByUrlsRaw)
  const DataGroupByUrlsName = Object.keys(DateGroupByUrlsRaw)
  const data: any = []
  DateGroupByUrlsData .forEach((item:any,index:number)=>{
      const dataItem = []
      const groupByHour = groupBy(item,'hour')
      for(let i = 0; i < 24; i++){
        dataItem.push({
          url: DataGroupByUrlsName[index],
          '访问量':sum(map(groupByHour[i],'pv')),
          '时段': `${i} 点`,
        })
      }
      data.push(dataItem)
  })
  console.log(flatten(data))
  return flatten(data)
  
}

//时段排序
export const PvUvGroupBytime = (arr: [])=>{

  const dataGroupTime = groupBy(arr,'hour')
  const data = []
  for(let i = 0; i < 24; i++){
        data.push({
          hour: `${i} 点`,
          '访问量': sum(map(dataGroupTime[i],'pv'))
        })
  }
  return data
  
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

//为七牛上传判断类型的函数（待优化）
export const judgeNullForUpload = (item1: any, item2: any, item3: any)=>{
  console.log(item1,item2,item3)
      if(item1.length){
        return item1
      }else if(item2.length){
        return item2
      }else{
        return [{'url': item3}]
      }
}
