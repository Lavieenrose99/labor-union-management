/*
 * @Author: your name
 * @Date: 2021-06-07 20:02:23
 * @LastEditTime: 2021-06-14 01:57:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Class/person.tsx
 */

import React from 'react'
import {
  Drawer, 
  Descriptions, 
  Empty
} from 'antd'
import  { connect } from 'umi';
import { get } from 'lodash';
import './index.less'



const ClassStudent: React.FC= (props)=>{

  const { show, onCloseDrawer, person  } = props
  
    return (
      <>
        <Drawer
          title="班级成员"
          placement="right"
          onClose={()=>onCloseDrawer(false)}
          visible={show}
          width="40vw"
          destroyOnClose
          footerStyle={{ backgroundColor: '#f0f2f5' }}
          headerStyle={{ backgroundColor: '#f0f2f5' }}
        >
          { person.length > 0 ?
        <Descriptions column={2} bordered size="middle">
            { 
            person.map((item)=>{
                return(
                    <>
                         <Descriptions.Item label="名字">
                             {
                                item.account.nickname
                             }
                       </Descriptions.Item>
                        <Descriptions.Item label="邮箱">
                        {
                           item.account.email
                        }
                    </Descriptions.Item>
                  </>
                )
            })
    
}
        </Descriptions>
        : <Empty description="暂时没有学生报名"
        
        />
}
        </Drawer>
      </>
    );
}



export default connect(({ partycourse }: any) => ({
    CoureseEnity: get(partycourse, 'CoureseEnity', []),
    UploadStatus: get(partycourse, 'status',false),
    GoodsList: get(partycourse,'CourseGoods',[])
  }))(ClassStudent);