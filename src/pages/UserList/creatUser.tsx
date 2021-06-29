/*
 * @Author: your name
 * @Date: 2021-05-27 16:27:08
 * @LastEditTime: 2021-05-31 15:41:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Goods/create.tsx
 */
import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal } from 'antd';
import { connect } from 'umi';
import { UploadAntd } from '@/utils/upload/qiniu'
import { map } from 'lodash'


const UserCreator = (props) => {
  const { TextArea } = Input;
  const { show, closeInfosModel , StroageCover, StroagePictures } = props;
  const StroageCoverS = localStorage.getItem(StroageCover) ? map([...JSON.parse(String(localStorage.getItem(StroageCover)))],'url') : []
  const StroagePictureS = localStorage.getItem(StroagePictures) ? map([...JSON.parse(String(localStorage.getItem(StroagePictures)))],'url') : []


  return (
    <>
      <Modal
        title="用户创建"
        width="40vw"
        visible={show}
        destroyOnClose 
        onCancel={() => closeInfosModel(false)}
        onOk={async() => {
          await props.dispatch({
            type: '',
            payload: {
              nickname: "",
              email: "",
              password: "",
            },
          });
          closeInfosModel(false);
        }}
        
      >
        <div className="fmg-infos-creator-container">
        <div className="fmg-infos-creator-title">
                <span style={{
                    marginRight: 15
                    }}
                >
                    E-mail:
                    {' '}
                </span>
                <Input
                    onChange={()=>{}}
                    style={{ minWidth: '10vw', marginBottom: 10 }}
                />
            </div>
            <div className="fmg-infos-creator-title">
                <span style={{
                    marginRight: 15
                    }}
                >
                    密码:
                    {' '}
                </span>
                <Input
                    onChange={()=>{}}
                    style={{ minWidth: '10vw', marginBottom: 10 }}
                />
            </div>
          <div className="fmg-infos-creator-title">
            <span style={{
             marginRight: 15
            }}
            >
              确认密码：
              {' '}
            </span>
          <Input
              onChange={()=>{}}
              style={{ minWidth: '10vw', marginBottom: 10 }}
            />
            </div>
            <div className="fmg-infos-creator-title">
                <span style={{
                    marginRight: 15
                    }}
                >
                    昵称:
                    {' '}
                </span>
                <Input
                    onChange={()=>{}}
                    style={{ minWidth: '10vw', marginBottom: 10 }}
                />
            </div>
            <div className="fmg-infos-creator-title">
                <span style={{
                    marginRight: 15
                    }}
                >
                    验证码
                    {' '}
                </span>
                <Input
                    onChange={()=>{}}
                    style={{ minWidth: '10vw', marginBottom: 10 }}
                />
            </div>

          
          
        </div>
      </Modal>
    </>
  );
};
export default connect(({  setcentermodel }) => ({
//   InfosList: get(fmgInfos, 'InfosList', []),
}))(UserCreator);
