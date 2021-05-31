/*
 * @Author: your name
 * @Date: 2021-05-24 15:26:15
 * @LastEditTime: 2021-05-24 15:56:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/index.tsx
 */
import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
import { PageContainer } from '@ant-design/pro-layout';
import { List, Avatar, Space, Modal, Button, Image, Input, Upload, Switch } from 'antd';
import { FilePptTwoTone, DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get } from 'lodash';
import { BASE_QINIU_URL } from '@/utils/upload/qiniu';
import { filterHTMLStr } from '../../utils/adjust_picture';
import { render } from 'react-dom';
import RichTextEditor from '@/utils/upload/richTextUpload';
import './change.less';
import ImgCrop from 'antd-img-crop';

// 需要登录才能修改
interface INewsChangeType {
  showModal: boolean;
  closeChangeModal: Function;
  info: any;
  dispatch: Dispatch;
}

const NewsChanger: React.FC<INewsChangeType> = (props) => {
  const { showModal, closeChangeModal, info, dispatch } = props;
  const { TextArea } = Input;
  const [infoTitle, setInfoTitle] = useState('');
  const [infoIntroduction, setInfoIntroduction] = useState('');
  const [infoPicture, setInfoPicture] = useState('');
  const [infoContent, setInfoContent] = useState('');
  const [infoIsPublish, setInfoIsPublish] = useState<boolean>(false);
  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handlePictureChange = () => {};
  const handleSubmit = () => {
    dispatch({
      type: 'setcentermodel/changeNewsEnity',
      payload: {
        updateData: {
          news_label: info.news_label,
          title: infoTitle,
          content: infoContent,
          is_publish: infoIsPublish,
          introduction: infoIntroduction,
          picture: info.picture,
        },
        updateId: info.id,
      },
    });
  };
  useEffect(() => {
    setInfoTitle(info.title);
    setInfoIntroduction(info.introduction);
    setInfoPicture(info.picture);
    setInfoContent(info.content);
    setInfoIsPublish(info.is_publish);
  }, [info]);
  return (
    <>
      <Modal
        title={'资讯详情'}
        visible={showModal}
        destroyOnClose
        onCancel={() => {
          closeChangeModal(false);
        }}
        onOk={() => {
          handleSubmit();
          closeChangeModal(false);
        }}
        width={1200}
      >
        <div className="change-panel">
          <div className="change-title">
            <span>资讯标题：</span>
            <Input
              className="change-title-input"
              value={infoTitle}
              onChange={(e) => {
                setInfoTitle(e.target.value);
                console.log(infoTitle);
              }}
            />
          </div>
          <div className="change-introduction">
            <span>资讯摘要：</span>
            <TextArea
              className="change-introduction-input"
              value={infoIntroduction}
              onChange={(e) => {
                setInfoIntroduction(e.target.value);
              }}
            />
          </div>
          <div className="change-isPublish">
            <span>是否发布：</span>
            <Switch
              className="change-isPublish-input"
              defaultChecked={infoIsPublish}
              onChange={(val) => {
                setInfoIsPublish(val);
                console.log(val);
              }}
            />
          </div>
          <div className="change-picture">
            <span>资讯封面：</span>
            <div className="change-picture-input">
              <Upload
                listType="picture-card"
                showUploadList={false}
                onChange={() => {
                  handlePictureChange();
                }}
              >
                {infoPicture ? (
                  <img src={infoPicture} alt="picture" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </div>
          <div className="change-content">
            <RichTextEditor defaultText={infoContent} width={1080} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default connect(({ setcentermodel }: any) => ({}))(NewsChanger);
