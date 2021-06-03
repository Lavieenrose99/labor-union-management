/*
 * @Author: your name
 * @Date: 2021-05-13 16:49:13
 * @LastEditTime: 2021-06-03 16:57:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Monitor/index.tsx
 * 
 */
import React, { useState, useEffect } from 'react';
import {
    Table,
    Select
} from 'antd'
import {
    FinalPvUvAmount,
    PvUvGroupByDate,
    PvUvGroupByUrls
} from '@/utils/public/tools.tsx'
import {
    DateSelector,
    CountDateFromTo,
   
}from '@/utils/public/date'
import request from '@/utils/request';
import { UrlsRank } from '@/utils/Table/monitor'
import { Chart, LineAdvance} from 'bizcharts';
import './index.less'

const { Option } = Select


const MonitorIndex: React.FC = ()=>{
    
    const [ PvUvSum, setPvUvSum ] = useState({}) 
    const [ periodDataRaw, setPeriodDataRaw ] = useState([])
    const [ periodDataByDateRaw, setPeriodDataByDateRaw ] = useState([])
    const [ periodDataByDateSum, setPeriodDateByDateSum ] = useState([])
    const [ periodDataByUrls, setPeriodDateByUrls ] = useState([])

    const handleTimeRegion: any = (value)=>{
            // console.log(value)
            // console.log(moment(value[0]).format('YYYY-MM-DD-HH-mm'))
    }
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
        TimeInterval(7)
     }, []);

    useEffect(()=>{
        setPvUvSum(FinalPvUvAmount(periodDataRaw))
        setPeriodDateByUrls(PvUvGroupByUrls(periodDataRaw))
    },[periodDataRaw])
    useEffect(()=>{
        setPeriodDateByDateSum(PvUvGroupByDate(periodDataByDateRaw))
    },[periodDataByDateRaw])
    return (
        <>
        <section  className="monitor_index_header_container">
          <Select style={{ width: 200, display: 'block'}} 
            defaultValue={DateSelector[1].value} 
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
            <div style={{ margin: 20}}>总访问量:{PvUvSum.pvSum}</div>
        <section className="monitor_index_header">
            <section className="long_period_line_chart_coantianer">
            <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={periodDataByDateSum} >
		<LineAdvance
			shape="smooth"
			point
			area
			position="date*value"
			color="name"
		/>
	</Chart>
        </section>
        </section>
        </section>
        {/* <DatePicker.RangePicker onChange={handleTimeRegion}
        format="YYYY-MM-DD HH:mm"
        showTime 
        /> */}
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