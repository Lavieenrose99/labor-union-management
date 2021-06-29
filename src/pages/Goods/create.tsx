/*
 * @Author: your name
 * @Date: 2021-05-27 16:27:08
 * @LastEditTime: 2021-06-14 02:01:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Goods/create.tsx
 */
import React, { useState } from 'react';
import { Modal, Input, Switch, InputNumber, message } from 'antd';
import { connect } from 'umi';
import { UploadAntd } from '@/utils/upload/qiniu'
import { map } from 'lodash'
import RichTextEditor from '@/utils/upload/richTextUpload';
import { filterHTMLTag } from '../../utils/upload/filterHtml';
import { goodsCheck } from '@/utils/verify/goods'
import './create.less'

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
        width={1000}
        visible={show}
        destroyOnClose 
        onCancel={() => closeInfosModel(false)}
        onOk={async() => {
          if(goodsCheck(infosTitle, goodsPrice, inventory, cover[0], filterHTMLTag(infosPreSeem))) {
            await props.dispatch({
              type: 'partycourse/addPartyGoods',
              payload: {
                name: infosTitle,
                price: goodsPrice * 100,
                brief: filterHTMLTag(infosPreSeem),
                is_on: ifPublish,
                cover: cover[0],
                pictures,
                inventory
              },
            });
            localStorage.removeItem(StroageCover)
            localStorage.removeItem(StroagePictures)
            closeInfosModel(false);
          }
        }}
        
      >
        <div className="goods-creator-container">
          <div className="goods-creator-title">
            <span>商品名称：</span>
            <Input
              className="goods-creator-input goods-creator-name-input"
              onChange={(e) => {
                setInfosTitle(e.target.value);
              }}
            />
          </div>
          <div className="goods-creator-title">
            <span>商品价格：</span>
          <InputNumber
            className="goods-creator-input goods-creator-price-input"
            defaultValue={goodsPrice}
              onChange={(e)=>setGoodsPrice(e)}
              formatter={(Goodvalues) => `¥ ${Goodvalues}`}
              parser={(Goodvalues) => Goodvalues.replace(/¥ \s?|(,*)/g, '')}
              min={0}
              step={0.01}
            />
            </div>
            <div className="goods-creator-title">
            <span>商品库存：</span>
          <InputNumber
            className="goods-creator-input goods-creator-inventory-input"
            defaultValue={inventory}
              onChange={(e)=>setInventory(e)}
              formatter={(val) => val}
              parser={(val) => val ? val.replace(/^(0+)|[^\d]/g, '') : ''}
              min={0}
              step={1}
            />
            </div>
          <div className="goods-creator-title">
            <span>商品封面：</span>
            <div className="goods-creator-input goods-creator-cover-input">
              <UploadAntd 
                fileStorage={StroageCover}
                showType="normal"
                setUrl={serCover}
                childFileType='picture'
                fileCount={1}
                listshowType='picture-card'
              />
           </div>
          </div>
          <div className="goods-creator-title">
            <span>商品图片：</span>
            <div className="goods-creator-input goods-creator-pictures-input">
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
          <div className="goods-creator-title">
            <span>商品简介：</span>
            <div
              className="goods-creator-input goods-creator-brief-input"
              >
              <RichTextEditor
                subscribeRichText={(val: string) => setInfosPreSeem(val)}
                defaultText={infosPreSeem} width={800} height={200 } />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default connect(({  setcentermodel }) => ({
//   InfosList: get(fmgInfos, 'InfosList', []),
}))(GoodsCreator);
