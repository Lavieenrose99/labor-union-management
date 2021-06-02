/*
 * @Author: your name
 * @Date: 2021-05-13 16:49:13
 * @LastEditTime: 2021-06-02 17:08:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Monitor/index.tsx
 * 
 */
import React, { useState, useEffect } from 'react';
import {
    DatePicker
} from 'antd'
import {
    FinalPvUvAmount
} from '@/utils/public/tools'
import request from '@/utils/request';
import moment from 'moment';

const MonitorIndex: React.FC = ()=>{
    
    const [ PvUvSum, setPvUvSum ] = useState({}) 

    const handleTimeRegion: any = (value)=>{
            console.log(value)
            console.log(moment(value[0]).format('YYYY-MM-DD-HH-mm'))
    }

    useEffect(() => {
        request('/api.monitor/data/pvuv', {
          method: 'GET',
          params:  {'date': '2021-5-31'}
        }).then((data) => {
         setPvUvSum(FinalPvUvAmount(data))
        });
    
     }, []);
     
    return (
        <>
        <DatePicker.RangePicker onChange={handleTimeRegion}
        format="YYYY-MM-DD HH:mm"
        showTime 
        />
        <div>总访问量{PvUvSum.pvSum}</div>
        监控页面
        </>
    )
}

export default MonitorIndex