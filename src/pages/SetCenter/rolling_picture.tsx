/*
 * @Author: your name
 * @Date: 2021-05-19 10:22:53
 * @LastEditTime: 2021-06-07 18:16:09
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
      const [ settingType, setSettingType ] = useState<string>('')
      const [changeRollings, setChangeRollings ] = useState([])
      
       
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
      if(settingType === 'change'){
        props.dispatch({
            type: 'setcentermodel/changeRollingPictures',
            payload: changeRollings
        })
      }else{
        props.dispatch({
          type: 'setcentermodel/addRollingPictures',
          payload: changeRollings
      })
      }
    }
    const handleChange: any = (e)=>{
      setChangeRollings(e)
    }
    return(
        <>
         <PageContainer 
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="2" onClick={()=> { setShowCreate(true); setSettingType('add')   }} 
          disabled={RollingsEnity.length > 0} >创建轮播图</Button>,
          <Button key="3" onClick={()=>{ setShowCreate(true); setSettingType('change') } } >修改轮播图</Button>
        ]}
        ></PageContainer>
        <section className="carousel_picture_container">
        <Carousel autoplay  className="carousel_picture" dotPosition="left">{
            (RollingsEnity).map((item: any)=>{
                return(
                    <div>
                    <Image src={item.course_cover} width={400} height={200}/>
                    </div>
                )
            })
        }
         </Carousel>
        </section>
        <section className="carousel_list_container">
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
    dataSource={CoureseEnity}
    footer={
      <div>
        <b>全国总工会</b> 惠福党建中心
      </div>
    }
    renderItem={item => (
      <List.Item>
      <Card title={`党建系列课 ${item.name}`}><Image 
          src={item.course_cover}
          height={180}
          fallback="http://qiniu.fmg.net.cn/picture-1606378155000"
          /></Card>
    </List.Item>
    )}
  />
  </section>
        <Modal visible={showCreate} 
        onCancel={()=>setShowCreate(false)} 
        width={400} 
        onOk={handleRollings}>
        <Select
      defaultValue={map(RollingsEnity,'id')}
       mode="multiple"
       showArrow
       style={{ width: '80%', margin: 20}}
       onChange={handleChange}
  >
    { 
      CoureseEnity.map((item: any) => {
        return(
        <Option value={item.id}>
          {
            item.name
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
