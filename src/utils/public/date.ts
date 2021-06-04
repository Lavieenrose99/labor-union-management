/*
 * @Author: your name
 * @Date: 2021-06-02 23:44:42
 * @LastEditTime: 2021-06-03 00:40:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/public/date.ts
 */

 import moment from 'moment'

 export const CountDateFromTo = (date:number)=>{
     const TimeMill = []
     let nowTime = moment().valueOf()
     while(date > 0){ 
         TimeMill.push(moment(nowTime).format('YYYY-MM-DD'))
         nowTime -= 86400000
         date--
        
     }
     return TimeMill
 }

 export const DateSelector = [
     {
         name: '三天内',
         value: 3
     },
     {
         name: '七天内',
         value: 7
     },
     {
         name: '十天内',
         value: 8
     }
 ]