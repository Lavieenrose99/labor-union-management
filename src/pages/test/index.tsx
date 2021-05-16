/*
 * @Author: your name
 * @Date: 2021-05-15 14:42:30
 * @LastEditTime: 2021-05-15 17:03:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/test/index.tsx
 */

 import React, { useState , useEffect } from 'react'
 import type { Dispatch } from 'umi';
import  { connect } from 'umi';
import { filter, get } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Tag , List , Space , Modal, Card } from 'antd';
import Icon, { PlusCircleTwoTone } from '@ant-design/icons';
import { SettingOutlined , MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import './class_list.less';
import moment from 'moment';
import { filterHTMLStr } from '../../utils/adjust_picture'
import { BASE_QINIU_URL } from '@/utils/Token'
import {IconFont} from '@/utils/icon_set'




 const NewSList: React.FC = (props)=>{
     const { News } = props;
     // const [infosTagsChecked, setInfosTagsChecked] = useState(0);
     console.log(News)
     useEffect(()=>{
         props.dispatch({
             type: 'Testcourse/fetchTestList'
         })
     },[])
     
     return(
         <PageHeaderWrapper>
            <Button
                type="primary"
                style={{
                    margin:20,
                }}
                onClick = {() => {

                }}
                icon={<PlusCircleTwoTone/>}
            >
                添加课程
            </Button>
            <Button
                type="primary"
                style={{
                    margin:20,
                }}
                onClick = {() => {

                }}
                icon={<SettingOutlined />}
            >
                标签管理
            </Button>

            <Card className = "Class-Tags-selector">
                <PlusCircleTwoTone style={{
                    margin: 5,
                }}
                    onClick={() => {

                    }}
                />
                {
                    <Tag.CheckableTag checked>
                        全部
                    </Tag.CheckableTag>                     
                }
                {
                    <Tag>其他</Tag>
                }
            </Card>
            <div className="fmg-infos-container">
                <List
                    className="fmg-infos-items"
                    itemLayout="vertical"
                    size="default"
                    pagination={{
                        onChange:(page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={News}
                    footer={
                        <div>
                            <b>课程列表</b>
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            className="fmg-infos-item"
                            key={item.title}
                            actions={[
                                <IconFont 
                                    style={{ marginRight: 10 }}
                                    type="iconxiangqingchakan"
                                    onClick={() => {
                                        // setChangeItem(item);
                                        // setShowChangeModal(true);
                                    }}
                                />,
                                <IconFont
                                    type="iconshanchu"
                                    style={{ margin: 10 }}
                                    onClick={() => {
                                        Modal.confirm({
                                            mask: false,
                                            title: '课程列表',
                                            content: '确认删除课程吗',
                                            okText: '确认',
                                            cancelText: '取消',
                                            onOk: () => {
                                                props.dispatch({
                                                    type: 'fmgInfos/DelInfos',
                                                    payload: item.id,
                                                }); 
                                            },
                                        }); 
                                    }}
                                />
                            ]}
                            extra={
                                <>
                                  <Space size="large">
                                    <img
                                      style={{ marginTop: 20 }}
                                      width={180}
                                      height={120}
                                      alt="logo"
                                      src={item.cover ? BASE_QINIU_URL + item.cover
                                        : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
                                    />
                                    <span>
                                      {moment(item.create_time * 1000)
                                        .format('YYYY-MM-DD HH:mm:ss')}
                                    </span>
                                    <Tag color="red">热门</Tag>
                                    <div style={{ textAlign: 'right' }} />
                                  </Space>
                                 
                                </>
                              }
                        >
                        <List.Item.Meta
                            className="fmg-infos-item-meta"
                            title={<a href={item.href}>{item.title}</a>}
                            description={<span
                                className="info-show-text"
                            >
                                {
                                    filterHTMLStr(item.content)
                                }

                            </span>}
                        >

                        </List.Item.Meta>
                        
                        </List.Item>
                    )}
                    >

                </List>


            </div>

         </PageHeaderWrapper>

     )
 }


 export default connect(({ Testcourse }: any) => ({
    News: get(Testcourse, 'CoureseEnity', []),
  }))(NewSList);