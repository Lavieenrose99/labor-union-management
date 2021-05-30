/*
 * @Author: your name
 * @Date: 2021-05-27 16:27:08
 * @LastEditTime: 2021-05-29 21:02:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Goods/create.tsx
 */
import React, { useState } from 'react';
import { Modal, Input, Switch, InputNumber } from 'antd';
import { connect } from 'umi';
import { UploadAntd } from '@/utils/upload/qiniu'
import { map } from 'lodash'


const  GoodsCreator = (props) => {
  const { TextArea } = Input;
  const { show, closeInfosModel , StroageCover, StroagePictures } = props;
  const StroageCoverS = localStorage.getItem(StroageCover) ? map([...JSON.parse(String(localStorage.getItem(StroageCover)))],'url') : []
  const StroagePictureS = localStorage.getItem(StroagePictures) ? map([...JSON.parse(String(localStorage.getItem(StroagePictures)))],'url') : []
  const [infosTitle, setInfosTitle] = useState('');
  const [ inventory, setInventory ] = useState(0);
  const [ goodsPrice, setGoodsPrice ] = useState(0)
  const [infosPreSeem, setInfosPreSeem] = useState('');
  const [ifPublish, setIfPublish ] = useState(false);
  const [ cover, serCover ] = useState(StroageCoverS);
  const [ pictures, setPictures ] = useState(StroagePictureS);


 console.log(cover)
  return (
    <>
      <Modal
        title="商品创建"
        width="80vw"
        visible={show}
        destroyOnClose 
        onCancel={() => closeInfosModel(false)}
        onOk={async() => {
          await props.dispatch({
            type: 'partycourse/addPartyGoods',
            payload: {
              name: infosTitle,
              price: goodsPrice,
              brief: infosPreSeem,
              is_on: ifPublish,
              cover: cover[0],
              pictures,
              inventory
            },
          });
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
              onChange={(e) => {
                setInfosTitle(e.target.value);
              }}
            />
          </div>
          <div className="fmg-infos-creator-title">
            <span style={{
              position: 'fixed',
            }}
            >
              商品简介:
              {' '}
            </span>
            <TextArea
              style={{
                width: '50vw',
                marginLeft: 80,
                marginBottom: 10, 
              }}
              onChange={(e) => {
                setInfosPreSeem(e.target.value);
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
              onChange={(e)=>setGoodsPrice(e)}
              style={{ minWidth: '10vw', marginBottom: 10 }}
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
              onChange={(e)=>setInventory(e)}
              style={{ minWidth: '10vw', marginBottom: 10 }}
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
         <Switch onChange={(e)=>setIfPublish(e)} checked={ifPublish}  />
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
             setUrl={serCover}
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
             setUrl={setPictures}
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
}))(GoodsCreator);
