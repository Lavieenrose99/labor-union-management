/*
 * @Author: your name
 * @Date: 2021-05-24 16:12:30
 * @LastEditTime: 2021-05-31 15:47:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/create.tsx
 */
import React, { useState } from 'react';
import { Modal, Input, Upload, Switch } from 'antd';
import { connect } from 'umi';
import { UploadAntd }from '@/utils/upload/qiniu';
import RichTextEditor from '../../utils/upload/richTextUpload';
import { filterHTMLTag } from '../../utils/upload/filterHtml';


const  InfosCreate = (props) => {
  const { TextArea } = Input;
  const { show, closeInfosModel, CoverStroage } = props;
  const [infosTitle, setInfosTitle] = useState('');
  const [infosPreSeem, setInfosPreSeem] = useState('');
  const [ifPublish, setIfPublish ] = useState(false);
  const [ cover, setcover ] =useState(([JSON.parse(String(localStorage.getItem(CoverStroage)))] ?? []));
  const [ partyInfosContent, setPartyInfosContent ] = useState(localStorage.getItem('party_infos_content'));
  const subscribeInfos = (text: string) => {
    localStorage.setItem('party_infos_content', text);
    setPartyInfosContent(text)
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
              content: filterHTMLTag(partyInfosContent),
              is_publish: true,
              news_label: 6,
              introduction: infosPreSeem,
              pictures: cover[0]
            },
          });
          localStorage.removeItem('party_infos_content');
          localStorage.removeItem(CoverStroage);
          setPartyInfosContent('')
          setcover([])
          closeInfosModel(false);
        }}
      >
        <div className="fmg-infos-creator-container">
          <div className="fmg-infos-creator-title">
            <div>资讯标题: </div>
            <Input
              style={{
                display: 'inline-flex',
                width: '30vw',
                marginBottom: 20, 
              }}
              onChange={(e) => {
                setInfosTitle(e.target.value);
              }}
            />
          </div>
          <div className="fmg-infos-creator-title">
            <div >
              资讯摘要:
              {' '}
            </div>
            <TextArea
              style={{
                display: 'inline-flex',
                width: '30vw',
                marginBottom: 20, 
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
              资讯封面:
              {' '}
            </span>
            <UploadAntd 
              fileStorage={CoverStroage}
              showType="normal"
              setUrl={setcover}
              childFileType='picture'
              fileCount={1}
              listshowType='picture-card'
           />
          </div>
     
          <RichTextEditor 
            subscribeRichText={subscribeInfos} 
            defaultText={partyInfosContent}
          />
        </div>
      </Modal>
    </>
  );
};
export default connect(({  setcentermodel }) => ({
//   InfosList: get(fmgInfos, 'InfosList', []),
}))(InfosCreate);
