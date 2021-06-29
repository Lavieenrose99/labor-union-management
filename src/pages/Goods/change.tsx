/*
 * @Author: your name
 * @Date: 2021-05-27 16:27:08
 * @LastEditTime: 2021-06-14 02:02:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Goods/create.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal, Input, Switch, InputNumber } from 'antd';
import { connect } from 'umi';
import { UploadAntd } from '@/utils/upload/qiniu'
import RichTextEditor from '@/utils/upload/richTextUpload';
import { filterHTMLTag } from '../../utils/upload/filterHtml';
import { goodsCheck } from '@/utils/verify/goods'
import './change.less'

const  GoodsChanger = (props) => {
  const { dispatch, show, closeInfosModel , info } = props;
  const [infoName, setInfoName] = useState('');
  const [ infoInventory, setInfoInventory ] = useState(0);
  const [ infoPrice, setInfoPrice ] = useState(0)
  const [infoBrief, setInfoBrief] = useState('');
  const [infoIsOn, setInfoIsOn ] = useState(false);
  const [ infoCover, setInfoCover ] = useState('');
  const [ infoPictures, setInfoPictures ] = useState();
  useEffect(() => {
    setInfoName(info.name)
    setInfoPrice(info.price / 100)
    setInfoInventory(info.inventory)
    setInfoIsOn(info.is_on)
    setInfoCover(info.cover)
    setInfoPictures(info.pictures)
    setInfoBrief(info.brief)
  }, [info])
  console.log(info)
  console.log(infoCover)
  console.log(infoBrief)
  console.log(infoIsOn)
  console.log(infoPrice)
  return (
    <>
      <Modal
        title="修改商品信息"
        width={1000}
        visible={show}
        destroyOnClose
        onCancel={() => closeInfosModel(false)}
        onOk={()=>{
          if(goodsCheck(infoName, infoPrice, infoInventory, infoCover, infoBrief)) {
            dispatch({
              type:'partycourse/changePartyGoods',
              payload: {
                params: {
                  name: infoName,
                  brief: filterHTMLTag(infoBrief),
                  price: infoPrice * 100,
                  inventory: infoInventory,
                  is_on: infoIsOn,
                  cover: infoCover,
                  pictures: infoPictures,
                },
                updateId: info.id
              }
            })
            closeInfosModel(false);
          }
        }}
      >
        <div className="goods-changer-container">
          <div className="goods-changer-title">
            <span>商品名称：</span>
            <Input
              className="goods-changer-input goods-changer-name-input"
              value={infoName}
              onChange={(e) => {
                setInfoName(e.target.value);
              }}
            />
          </div>
          <div className="goods-changer-title">
            <span>商品价格：</span>
            <InputNumber
              className="goods-changer-input goods-changer-price-input"
              onChange={(e)=>setInfoPrice(e)}
              value={infoPrice}
              formatter={(Goodvalues) => `¥ ${Goodvalues}`}
              parser={(Goodvalues) => Goodvalues.replace(/¥ \s?|(,*)/g, '')}
              min={0}
              step={0.01}
              />
            </div>
            <div className="goods-changer-title">
            <span>商品库存：</span>
            <InputNumber
              className="goods-changer-input goods-changer-inventory-input"
              onChange={(e)=>setInfoInventory(e)}
              value={infoInventory}
              formatter={(val) => val}
              parser={(val) => val.replace(/^(0+)|[^\d]/g, '')}
              min={0}
              step={1}
              />
            </div>
          <div className="goods-changer-title">
            <span>是否上架：</span>
            <Switch
              className="goods-changer-input"
              onChange={(e)=>setInfoIsOn(e)}
              checked={infoIsOn} />
          </div>
          <div className="goods-changer-title">
            <span>商品封面：</span>
            <div className="goods-changer-input goods-changer-cover-input">
              <UploadAntd
                propsFileItem={infoCover}
                showType="normal"
                setUrl={setInfoCover}
                childFileType='picture'
                fileCount={1}
                listshowType='picture-card'
                />
            </div>
          </div>
          <div className="goods-changer-title">
            <span>商品图片：</span>
            <div className="goods-changer-input goods-changer-pictures-input">
              <UploadAntd 
                propsFileArr={infoPictures}
                showType="normal"
                setUrl={setInfoPictures}
                childFileType='picture'
                fileCount={3}
                listshowType='picture-card'
              />
            </div>
          </div>
          <div className="goods-changer-title">
            <span>商品简介：</span>
            <div
              className="goods-changer-input goods-changer-brief-input"
              >
              <RichTextEditor
                subscribeRichText={(val: string) => setInfoBrief(val)}
                defaultText={infoBrief} width={800} height={200 } />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default connect(({  setcentermodel }) => ({
//   InfosList: get(fmgInfos, 'InfosList', []),
}))(GoodsChanger);
