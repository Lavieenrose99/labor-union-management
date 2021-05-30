/*
 * @Author: your name
 * @Date: 2021-05-24 16:12:30
 * @LastEditTime: 2021-05-24 17:10:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/create.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal, Input, Upload } from 'antd';
import { connect } from 'umi';
import { get } from 'lodash';
import request from '@/utils/request';
import { QINIU_SERVER, BASE_QINIU_URL, pictureSize } from '@/utils/upload/qiniu';
import ImgCrop from 'antd-img-crop';
import { uploadButton } from '@/utils/upload/uploadButton';
import RichTextEditor from '../../utils/upload/richTextUpload';
import { filterHTMLTag } from '../../utils/upload/filterHtml';

const InfosCreate = (props) => {
  const { TextArea } = Input;
  const { show, closeInfosModel } = props;
  const [infosTitle, setInfosTitle] = useState('');
  const [infosPreSeem, setInfosPreSeem] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [qiniuToken, setQiniuToken] = useState('');
  const [fileList, setFileList] = useState([JSON.parse(localStorage.getItem('FileList'))] ?? []);
  const [fmginfos, setFmgInfos] = useState(localStorage.getItem('infos'));
  const subscribeInfos = (text) => {
    localStorage.setItem('infos', text);
    setFmgInfos(text);
  };
  const getQiNiuToken = () => {
    request('/api.farm/goods/resources/qiniu/upload_token', {
      method: 'GET',
    }).then((response) => {
      setQiniuToken(response.token);
    });
  };
  // 看到其他的都要加true啊要不gettoken没用
  const getUploadToken = () => {
    getQiNiuToken();
    return true;
  };
  const handleChange = ({ file }) => {
    const { uid, name, type, thumbUrl, status, response = {} } = file;
    const fileItem = {
      uid,
      name,
      type,
      thumbUrl,
      status,
      response,
      url: BASE_QINIU_URL + (response.key || ''),
    };
    setPreviewImage(fileItem.url);
    setFileList([fileItem]);
    localStorage.setItem('FileList', JSON.stringify(fileItem));
  };

  return (
    <>
      <Modal
        title="党建资讯"
        width="80vw"
        visible={show}
        destroyOnClose
        onCancel={() => closeInfosModel(false)}
        onOk={() => {
          props.dispatch({
            type: 'setcentermodel/addInfosList',
            payload: {
              title: infosTitle,
              content: filterHTMLTag(fmginfos),
              is_publish: true,
              news_label: 5,
              introduction: infosPreSeem,
            },
          });
          localStorage.removeItem('infos');
          localStorage.removeItem('FileList');
          setFmgInfos('');
          closeInfosModel(false);
        }}
      >
        <div className="fmg-infos-creator-container">
          <div className="fmg-infos-creator-title">
            <span>资讯标题: </span>
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
            <span
              style={{
                position: 'fixed',
              }}
            >
              资讯摘要:{' '}
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
            <span
              style={{
                display: 'inline-flex',
              }}
            >
              资讯封面:{' '}
            </span>
            <div
              onClick={getUploadToken}
              style={{
                display: 'inline-flex',
                width: '40vw',
                marginLeft: 20,
                marginBottom: 10,
              }}
            >
              <ImgCrop aspect={pictureSize.rolling} grid>
                <Upload
                  action={QINIU_SERVER}
                  data={{
                    token: qiniuToken,
                    key: `picture-${Date.parse(new Date())}`,
                  }}
                  showUploadList={false}
                  listType="picture-card"
                  beforeUpload={getUploadToken}
                  onChange={handleChange}
                >
                  {fileList[0] ? (
                    <img
                      src={fileList[0] ? BASE_QINIU_URL + fileList[0].response.key : null}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </ImgCrop>
            </div>
          </div>

          <RichTextEditor subscribeRichText={subscribeInfos} defaultText={fmginfos} />
        </div>
      </Modal>
    </>
  );
};
export default connect(({ setcentermodel }) => ({
  //   InfosList: get(fmgInfos, 'InfosList', []),
}))(InfosCreate);
