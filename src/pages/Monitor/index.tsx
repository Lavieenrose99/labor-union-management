/*
 * @Author: your name
 * @Date: 2021-05-13 16:49:13
 * @LastEditTime: 2021-06-04 15:08:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Monitor/index.tsx
 * 
 */
import React, { useState, useEffect } from 'react';
import { history } from 'umi'
import { stringify } from 'querystring';
import {
    Table,
    Select,
    Statistic
} from 'antd'
import {
    FinalPvUvAmount,
    PvUvGroupByDate,
    PvUvGroupByUrls,
    PvUvGroupBytime,
    PvUvCompareByUrls
} from '@/utils/public/tools.tsx'
import {
    DateSelector,
    CountDateFromTo,
   
}from '@/utils/public/date'
import request from '@/utils/request';
import { UrlsRank } from '@/utils/Table/monitor'
import { Chart, LineAdvance,  Legend, Area } from 'bizcharts';
import './index.less'

const { Option } = Select


const MonitorIndex: React.FC = ()=>{
    
    const [ PvUvSum, setPvUvSum ] = useState({}) 
    const [ periodDataRaw, setPeriodDataRaw ] = useState([])
    const [ periodDataByDateRaw, setPeriodDataByDateRaw ] = useState([])
    const [ periodDataByDateSum, setPeriodDateByDateSum ] = useState([])
    const [ periodDataByUrls, setPeriodDateByUrls ] = useState([])
    const [ periodDataByTime, setPeriodDateByTime ] = useState([])
    const [ dataUrlCompare, setDataUrlCompare ] = useState([])

    const GetDateByDate: any =  async(arr: [], CopyData: [], CopyDataByDate: [])=>{
        await request('/api.monitor/data/pvuv', {
            method: 'GET',
            params:  {'date': arr}
          }).then((data: []) => {
             CopyData.push(...data)
             CopyDataByDate.push({[arr]: data})
             setPeriodDataRaw([...CopyData]) // 因为原本地址是相同的所以可以利用展开符创建新的对象
             setPeriodDataByDateRaw([...CopyDataByDate])
          }); 
          
    }
    const TimeInterval: any = (date: number)=>{
          const TimeArr = CountDateFromTo(date)
          const CopyData: any= []
          const CopyDataByDate: any = []
          TimeArr.forEach((item: string)=>{
              GetDateByDate(item, CopyData, CopyDataByDate )
          })
    }
   
    useEffect(() => {
        console.log((JSON.parse(sessionStorage.getItem('useInfos')??'{}')),'user')
         if(!(sessionStorage.getItem('useInfos'))){
            history.replace({
                pathname: '/user/login',
                search: stringify({
                  redirect: window.location.href,
                }),
              });
         }
        
        TimeInterval(3)
     }, []);

    useEffect(()=>{
        setDataUrlCompare(PvUvCompareByUrls(periodDataRaw))
        setPeriodDateByTime(PvUvGroupBytime(periodDataRaw))
        setPvUvSum(FinalPvUvAmount(periodDataRaw))
        setPeriodDateByUrls(PvUvGroupByUrls(periodDataRaw))
        setPeriodDateByDateSum(PvUvGroupByDate(periodDataByDateRaw))
    },[periodDataRaw,periodDataByDateRaw])
    return (
        <>
        <section  className="monitor_index_header_container">
          <Select style={{ width: 200, display: 'block'}} 
            defaultValue={DateSelector[0].value} 
            onChange={TimeInterval}>
                {
                    DateSelector.map(item=>{
                        return(
                            <Option value={item.value}>
                                {
                                    item.name
                                }
                            </Option>
                        )
                    })
                }
            </Select>
            <section className="monitor_index_header_sum">
            <Statistic title="访问量(pv)" value={PvUvSum.pvSum} style={{ margin: 20 }} />
            <Statistic title="用户量(uv)" value={2} style={{ margin: 20 }}  />
            </section>
        <section className="monitor_index_header">
            <section className="long_period_line_chart_coantianer">
    <Chart padding={[70, 70, 70, 70]} autoFit height={400} data={dataUrlCompare} >
            <Legend />
		<LineAdvance
            label="访问量"
			shape="smooth"
			point
			area
			position="时段*访问量"
			color="url"
		/>
	</Chart>
            <Chart padding={[70, 70, 70, 70]} autoFit height={400} data={periodDataByDateSum} >
            <Legend />
		<LineAdvance
            label={["value", { style: { fill: 'blue' } }]}
			shape="smooth"
			point
			area
			position="date*value"
			color="name"
		/>
	</Chart>
    <Chart padding={[70, 70, 70, 70]} autoFit height={400} data={periodDataByTime} >

        <Area position="hour*访问量" shape='smooth' color="#fc0040" />
	</Chart>
        </section>
        </section>
        </section>
        <section className="url_anslysis">
            <Table 
              dataSource={periodDataByUrls}
              columns={UrlsRank}
            
            />
        </section>
        </>
    )
}

export default MonitorIndex