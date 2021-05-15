/*
 * @Author: your name
 * @Date: 2021-05-15 14:42:30
 * @LastEditTime: 2021-05-15 17:03:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/test/index.tsx
 */

 import React, { useEffect } from 'react'
 import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get } from 'lodash';


 const NewSList: React.FC = (props)=>{
     const { News } = props
     console.log(News)
     useEffect(()=>{
         props.dispatch({
             type: 'Testcourse/fetchTestList'
         })
     },[])
     
     return(
         <>
         这是一个练习列表
         {
             <ul>{

             News.map((item,index,arr)=>{
                 return (
                     <li>
                {
                    item.desc
                }
                     </li>
                 )
                })
            }
                </ul>
         }
         </>
     )
 }


 export default connect(({ Testcourse }: any) => ({
    News: get(Testcourse, 'CoureseEnity', []),
  }))(NewSList);