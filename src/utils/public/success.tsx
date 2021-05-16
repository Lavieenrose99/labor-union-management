/*
 * @Author: your name
 * @Date: 2021-05-11 16:33:48
 * @LastEditTime: 2021-05-12 11:12:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/public/success.tsx
 */
import React, { useState,useEffect } from 'react'
import { Result, Button } from 'antd';
// import { history } from 'umi';

const SuccessResult = (props)=>{
   const [ countTime, setCountTime ] = useState<number>(5)
    let time = 5
    useEffect(()=>{
       setInterval(()=>{
         time--
         setCountTime(time)
       },1000)
    },[])
   if(countTime < 1){
     history.back()
   }

   return(
    <Result
    status="success"
    title="数据成功提交"
    subTitle={
      <div>
     {
       <strong>{        
      `${countTime}s后返回`
       }
       </strong>
     }
      </div>
    }
    extra={[
        <Button type="primary" key="console" onClick={
          ()=>{
            history.back()
          }
        }>
         返回
      </Button>
    ]}
    />
   )
    
}

export default SuccessResult