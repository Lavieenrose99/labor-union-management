/*
 * @Author: your name
 * @Date: 2021-05-27 16:27:08
 * @LastEditTime: 2021-05-29 21:02:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Goods/create.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal, Input, Switch, InputNumber } from 'antd';
import { connect } from 'umi';
import { UploadAntd } from '@/utils/upload/qiniu'
import { map } from 'lodash'


const  GoodsChanger = (props) => {
  const { TextArea } = Input;
  const { dispatch, show, closeInfosModel , StroageCover, StroagePictures, info } = props;
  const StroageCoverS = localStorage.getItem(StroageCover) ? map([...JSON.parse(String(localStorage.getItem(StroageCover)))],'url') : []
  const StroagePictureS = localStorage.getItem(StroagePictures) ? map([...JSON.parse(String(localStorage.getItem(StroagePictures)))],'url') : []
  const [infoName, setInfoName] = useState('');
  const [ infoInventory, setInfoInventory ] = useState(0);
  const [ infoPrice, setInfoPrice ] = useState(0)
  const [infoBrief, setInfoBrief] = useState('');
  const [infoIsOn, setInfoIsOn ] = useState(false);
  const [ infoCover, setInfoCover ] = useState(StroageCoverS);
  const [ infoPictures, setInfoPictures ] = useState(StroagePictureS);
  console.log(info)
  useEffect(() => {
    setInfoName(info.name)
    setInfoPrice(info.price)
    setInfoInventory(info.inventory)
    setInfoIsOn(info.is_on)
    setInfoCover(info.cover)
    setInfoPictures(info.pictures)
    setInfoBrief(info.brief)
  }, [info])
  return (
    <>
      <Modal
        title="修改商品信息"
        width="80vw"
        visible={show}
        destroyOnClose
        onCancel={() => closeInfosModel(false)}
        onOk={()=>{
          dispatch({
            type:'partycourse/changePartyGoods',
            payload: {
              params: {
                name: infoName,
                brief: infoBrief,
                price: infoPrice,
                inventory: infoInventory,
                is_on: infoIsOn,
                cover: infoCover[0],
                pictures: infoPictures,
              },
              updateId: info.id
            }
          })
          localStorage.removeItem(StroageCover)
          localStorage.removeItem(StroagePictures)
          closeInfosModel(false);
        }}
      >
        <div className="fmg-infos-creator-container">
          <div className="fmg-infos-creator-title">
            <span>商品名称: </span>
            <Input
              style={{
                display: 'inline-flex',
                width: '50vw',
                marginLeft: 20,
                marginBottom: 20,
              }}
              value={infoName}
              onChange={(e) => {
                setInfoName(e.target.value);
              }}
            />
          </div>
          <div className="fmg-infos-creator-title">
            <span>
              商品简介:
              {' '}
            </span>
            <TextArea
              style={{
                verticalAlign: 'top',
                width: '50vw',
                marginLeft: 20,
                marginBottom: 10, 
              }}
              value={infoBrief}
              onChange={(e) => {
                setInfoBrief(e.target.value);
              }}
            />
          </div>
          <div className="fmg-infos-creator-title">
            <span style={{
             marginRight: 15
            }}
            >
              商品价格:
              {' '}
            </span>
          <InputNumber
              onChange={(e)=>setInfoPrice(e)}
              style={{ minWidth: '10vw', marginLeft:10, marginBottom: 20 }}
              value={infoPrice}
              formatter={(Goodvalues) => `¥ ${Goodvalues}`}
              parser={(Goodvalues) => Goodvalues.replace(/¥ \s?|(,*)/g, '')}
              min={0}
              step={0.01}
            />
            </div>
            <div className="fmg-infos-creator-title">
            <span style={{
             marginRight: 15
            }}
            >
              商品库存:
              {' '}
            </span>
          <InputNumber
              onChange={(e)=>setInfoInventory(e)}
              style={{ minWidth: '10vw', marginLeft:10, marginBottom: 20 }}
              value={infoInventory}
              min={0}
              step={0.01}
            />
            </div>
          <div className="fmg-infos-creator-title">
            <span style={{
             marginRight: 15
            }}
            >
              是否发布:
              {' '}
            </span>
         <Switch onChange={(e)=>setInfoIsOn(e)} checked={infoIsOn}  />
          </div>
          <div className="fmg-infos-creator-title">
            <span  style={{
              display: 'inline-flex',
            }}
            >
              商品封面:
              {' '}
            </span>
           <UploadAntd 
             fileStorage={StroageCover}
             showType="normal"
             setUrl={setInfoCover}
             childFileType='picture'
             fileCount={1}
             listshowType='picture-card'
           />
          </div>
          <div className="fmg-infos-creator-title">
            <span  style={{
              display: 'inline-flex',
            }}
            >
              商品图片:
              {' '}
            </span>
           <UploadAntd 
             fileStorage={StroagePictures}
             showType="normal"
             setUrl={setInfoPictures}
             childFileType='picture'
             fileCount={3}
             listshowType='picture-card'
           />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default connect(({  setcentermodel }) => ({
//   InfosList: get(fmgInfos, 'InfosList', []),
}))(GoodsChanger);
