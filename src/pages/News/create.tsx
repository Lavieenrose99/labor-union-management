/*
 * @Author: your name
 * @Date: 2021-05-24 16:12:30
 * @LastEditTime: 2021-06-04 20:11:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/create.tsx
 */
import React, { useState } from 'react';
import { Modal, Input, Switch, Select } from 'antd';
import { connect } from 'umi';
import { UploadAntd } from '@/utils/upload/qiniu';
import RichTextEditor from '../../utils/upload/richTextUpload';
import { filterHTMLTag } from '../../utils/upload/filterHtml';
import { get } from 'lodash';
import './create.less';

const { Option } = Select;

const InfosCreate = (props) => {
  const { TextArea } = Input;
  const { show, closeInfosModel, CoverStroage, InfosTags } = props;
  const [infosTitle, setInfosTitle] = useState('');
  const [infosPreSeem, setInfosPreSeem] = useState('');
  const [ifPublish, setIfPublish] = useState(false);
  const [infosTags, setInfosTags] = useState(0);
  const [cover, setcover] = useState(
    [JSON.parse(String(localStorage.getItem(CoverStroage)))] ?? [],
  );
  const [partyInfosContent, setPartyInfosContent] = useState(
    localStorage.getItem('party_infos_content'),
  );
  const subscribeInfos = (text: string) => {
    localStorage.setItem('party_infos_content', text);
    setPartyInfosContent(text);
  };

  console.log(CoverStroage);

  return (
    <>
      <Modal
        title="党建资讯"
        width={1350}
        visible={show}
        destroyOnClose
        onCancel={() => closeInfosModel(false)}
        onOk={() => {
          props.dispatch({
            type: 'setcentermodel/addInfosList',
            payload: {
              title: infosTitle,
              content: filterHTMLTag(partyInfosContent),
              is_publish: ifPublish,
              news_label: infosTags,
              introduction: infosPreSeem,
              pictures: cover[0],
            },
          });
          localStorage.removeItem('party_infos_content');
          localStorage.removeItem(CoverStroage);
          setPartyInfosContent('');
          setcover([]);
          closeInfosModel(false);
        }}
      >
        <div className="fmg-infos-creator-container">
          <div className="fmg-infos-creator-title">
            <span>资讯标题: </span>
            <Input
              className="fmg-infos-creater-input fmg-infos-creater-title-input"
              onChange={(e) => {
                setInfosTitle(e.target.value);
              }}
            />
          </div>
          <div className="fmg-infos-creator-title">
            <span>资讯摘要: </span>
            <TextArea
              className="fmg-infos-creater-input fmg-infos-creator-introduction-input"
              onChange={(e) => {
                setInfosPreSeem(e.target.value);
              }}
            />
          </div>
          <div className="fmg-infos-creator-title">
            <span>关联标签: </span>
            <Select
              className="fmg-infos-creater-input fmg-infos-creator-tag-input"
              onChange={(e) => setInfosTags(e)}
              size="small"
            >
              {InfosTags.map((item) => {
                return <Option value={item.id}>{item.name}</Option>;
              })}
            </Select>
            <span>是否发布: </span>
            <Switch
              className="fmg-infos-creater-input fmg-infos-creator-isPublish-input"
              onChange={(e) => setIfPublish(e)}
              checked={ifPublish} />
          </div>
          <div className="fmg-infos-creator-title">
            <span>资讯封面: </span>
            <div className="fmg-infos-creater-input fmg-infos-creator-picture-input">
              <UploadAntd
                fileStorage={CoverStroage}
                showType="normal"
                setUrl={setcover}
                childFileType="picture"
                fileCount={1}
                listshowType="picture-card"
              />
            </div>
          </div>
          <div className="fmg-infos-creator-title">
            <div className="fmg-infos-creator-content-input">
              <RichTextEditor
                subscribeRichText={subscribeInfos}
                defaultText={partyInfosContent}
                width={1180}
                height={300}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default connect(({ setcentermodel }: any) => ({
  InfosTags: get(setcentermodel, 'InfosTags', []),
}))(InfosCreate);
