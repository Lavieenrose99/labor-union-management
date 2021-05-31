/*
 * @Author: your name
 * @Date: 2021-05-24 17:12:09
 * @LastEditTime: 2021-05-30 17:53:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/tags_create.tsx
 */
/*
 * @Author: your name
 * @Date: 2021-05-24 16:12:30
 * @LastEditTime: 2021-05-24 17:10:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/News/create.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal, Input, Upload, Tag } from 'antd';
import TagsGroups from '@/utils/public/tags_group';
import { connect } from 'umi';
import { get } from 'lodash';

const TagsCreate = (props) => {
  const { show, closeInfosModel, InfosTags, dispatch } = props;
  console.log(InfosTags);

  useEffect(() => {
    dispatch({
      type: 'setcentermodel/fetchInfosTagsList',
      payload: {
        limit: 99,
        page: 1,
      },
    });
  }, []);
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
            type: 'setcentermodel/fetchInfosTagsList',
            payload: {},
          });
          closeInfosModel(false);
        }}
      >
        <section>{<TagsGroups tagsList={InfosTags} dispatch={dispatch} />}</section>
      </Modal>
    </>
  );
};
export default connect(({ setcentermodel }: any) => ({
  InfosTags: get(setcentermodel, 'InfosTags', []),
}))(TagsCreate);
