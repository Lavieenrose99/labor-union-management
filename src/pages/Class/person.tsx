/*
 * @Author: your name
 * @Date: 2021-06-07 20:02:23
 * @LastEditTime: 2021-06-09 13:36:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Class/person.tsx
 */

import React,{ useState, useEffect } from 'react'
import { UploadAntd } from '@/utils/upload/qiniu'
import { FilePptTwoTone, 
  VideoCameraTwoTone,
  ExclamationCircleOutlined,
  SettingFilled } from '@ant-design/icons'
import { Input, 
  Modal,
  Button, 
  Select, 
  Drawer, 
  Descriptions, 
  Avatar, 
  Space , 
  Image} from 'antd'
import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { get, cloneDeep } from 'lodash';
import { ifOn } from '@/utils/public/tools'
import './index.less'


// interface PartyCourseProps {
//     dispatch: Dispatch
//     show: boolean
//     UploadStatus: boolean
//     GoodsList: [] 
//     showInfos: {}
//     onCloseDrawer: any
// }


const ClassStudent: React.FC= (props)=>{

  const { show, onCloseDrawer, person  } = props
  
    return (
      <>
        <Drawer
          title="班级成员"
          placement="right"
          onClose={()=>onCloseDrawer(false)}
          visible={show}
          width="60vw"
          footerStyle={{ backgroundColor: '#f0f2f5' }}
          headerStyle={{ backgroundColor: '#f0f2f5' }}
        >
        <Descriptions column={2} bordered size="middle">
            { person.map((item)=>{
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
        </Drawer>
      </>
    );
}



export default connect(({ partycourse }: any) => ({
    CoureseEnity: get(partycourse, 'CoureseEnity', []),
    UploadStatus: get(partycourse, 'status',false),
    GoodsList: get(partycourse,'CourseGoods',[])
  }))(ClassStudent);