/*
 * @Author: your name
 * @Date: 2021-05-19 10:22:53
 * @LastEditTime: 2021-05-24 00:49:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/SetCenter/rolling_picture.tsx
 */
import React, {
    useState, useEffect
  }  from 'react';
import type { Dispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout'
import { List, Modal, Button, Image, Carousel, Card, Select, Tag } from 'antd';
import { connect } from 'umi';
import { get,  map } from 'lodash'
import type { PartyCourseProps } from '../Party/index'
import './rolling_picture.less'


const { Option } = Select

interface IRollingsType extends PartyCourseProps{
    dispatch: Dispatch
    RollingsEnity: []
    CoureseEnity: any
}



const RollingPictures: React.FC<IRollingsType> = (props) =>{
      const { dispatch , RollingsEnity, CoureseEnity, pageTotal} = props
      const  [pageSize, setPageSize] = useState(12);
      const  [pageCurrent, setpageCurrent] = useState(1);
      const [ showCreate, setShowCreate ] = useState<boolean>(false)
      console.log(RollingsEnity,CoureseEnity)
       

    useEffect(()=>{
        dispatch({
            type: 'setcentermodel/fetchRollingsList'
        })
        dispatch({
            type: 'partycourse/fetchPartyList',
            payload: {
                limit: 12,
                page:1
            }
        })
        
    },[])

    const handleRollings: any = ()=>{
        props.dispatch({
            type: 'setcentermodel/addRollingPictures',
            payload: [21,22,23]
        })
    }

    const listData = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < CoureseEnity.length; i++) {
      listData.push({
        id: CoureseEnity[i].id,
        href: 'https://ant.design',
        video: CoureseEnity[i].data.course_video,
        title: `党建系列课 ${CoureseEnity[i].name}`,
        avatar: 'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic下载.jpeg',
        description: <div><strong>创建人: </strong><span>{CoureseEnity[i].data.person}</span></div>,
        ppt: CoureseEnity[i].course_ppt,
        content: CoureseEnity[i].course_brief,
        cover: CoureseEnity[i].course_cover
      });
    }
   
    const ids = map(CoureseEnity,'name')

    
    return(
        <>
         <PageContainer 
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="3" onClick={()=>setShowCreate(true)}>修改轮播图</Button>,
        ]}
        ></PageContainer>
        <section className="carousel_picture_container">
        <Carousel autoplay  className="carousel_picture" dotPosition="left">{
            RollingsEnity.map((item: any)=>{
                return(
                    <div>
                    <img src={item.course_cover} width={400}/>
                    </div>
                )
            })
        }
         </Carousel>
        </section>
        <List
         grid={{ gutter: 16, column: 4 }}
         bordered
    itemLayout="vertical"
    size="large"
    pagination={{
      total: pageTotal,
      pageSize,
      onShowSizeChange: (current, size) => {
        setPageSize(size);
      },
      onChange: (page, size) => {
        setpageCurrent(page);
        dispatch({
          type: 'partycourse/fetchPartyList',
          payload: {
            page,
            limit: size, 
          },
        });
      },
      showTotal: (total) => `第 ${pageCurrent} 页 共 ${total} 条`,
    }}
    dataSource={listData}
    footer={
      <div>
        <b>全国总工会</b> 惠福党建中心
      </div>
    }
    renderItem={item => (
      <List.Item>
      <Card title={item.title}><Image 
          src={item.cover}
          height={180}
          fallback="http://qiniu.fmg.net.cn/picture-1606378155000"
          /></Card>
    </List.Item>
    )}
  />
        {/* <Button onClick={handleRollings}>确定</Button> */}
        <Modal visible={showCreate} onCancel={()=>setShowCreate(false)} width={400}>
        <Select
       mode="multiple"
       showArrow
       style={{ width: '80%', margin: 20}}
  >
    {
      ids.map(item => {
        return(
        <Option value={item}>
          {
            item
          }
        </Option>
        )
      })
      
    }
  </Select> 
      </Modal>
        </>
    )
  };
  
  export default connect(({
    setcentermodel,
    partycourse 
  }: any) => ({
    RollingsEnity: get(setcentermodel,'RollingsEnity',[]),
    CoureseEnity: get(partycourse, 'CoureseEnity', []),
    pageTotal: get(partycourse,'pagination',0)
  }))(RollingPictures);
