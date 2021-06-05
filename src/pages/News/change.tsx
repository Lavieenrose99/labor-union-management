/*
 * @Author: your name
 * @Date: 2021-05-24 15:26:15
 * @LastEditTime: 2021-06-05 16:44:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/index.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal,Input,  Switch } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import RichTextEditor from '@/utils/upload/richTextUpload';
import './change.less';
import { UploadAntd }from '@/utils/upload/qiniu';
import { filterHTMLTag } from '../../utils/upload/filterHtml';

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


  const subscribeInfos = (text: string) => {
    setInfoContent(text)
  };
  const handleSubmit = () => {
    dispatch({
      type: 'setcentermodel/changeNewsEnity',
      payload: {
        updateData: {
          news_label: info.news_label,
          title: infoTitle,
          content: filterHTMLTag(infoContent),
          is_publish: infoIsPublish,
          introduction: infoIntroduction,
          picture: infoPicture[0],
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
            <UploadAntd 
              propsFileItem={infoPicture}
              showType="normal"
              setUrl={setInfoPicture}
              childFileType='picture'
              fileCount={1}
              listshowType='picture-card'
              />
          </div>
          <div className="change-content">
            <RichTextEditor
              subscribeRichText={subscribeInfos} 
              defaultText={infoContent} width={1080} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default connect(({ setcentermodel }: any) => ({}))(NewsChanger);
