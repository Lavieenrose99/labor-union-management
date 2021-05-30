/*
 * @Author: your name
 * @Date: 2021-05-19 10:57:15
 * @LastEditTime: 2021-05-25 09:27:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/models/set_center/setCenter.ts
 */
/*
 * @Author: your name
 * @Date: 2021-05-09 17:13:05
 * @LastEditTime: 2021-05-12 14:44:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/models/party/party_course.ts
 */
import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import {
  fetchRollingPicture,
  addRollingsPic,
  addNewsInfos,
  fetchNews,
  getNewsEnity,
  changeNews,
  fetTagList,
  delInfosTags,
  putInfosTags,
  addInfosTags,
} from '@/services/set_center/setCenter';
import { query } from 'express';

export interface AccountModalState {
  pagination: {
    limit: undefined;
    total: undefined;
    page: undefined;
  };
}

export interface AccountModelType {
  namespace: string;
  // state: AccountModelState;
  state: {
    status: boolean;
  };
  effects: {
    addRollingPictures: Effect;
    fetchRollingsList: Effect;
    addInfosList: Effect;
    fetchInfosTagsList: Effect;
    delInfosTags: Effect;
    putInfosTags: Effect;
    addInfosTags: Effect;
    fetchNewsList: Effect;
    changeNewsEnity: Effect;
  };
  reducers: {
    saveRollingsPic: Reducer<AccountModalState>;
    saveInfosTags: Reducer<AccountModalState>;
    saveNewsEnity: Reducer<AccountModalState>;
    savePagesInfos: Reducer<AccountModalState>;
  };
}

const RollingPictureModal: AccountModelType = {
  namespace: 'setcentermodel',
  state: {
    status: false,
  },
  effects: {
    *fetchRollingsList({ payload }, { call, put }) {
      const list = yield call(fetchRollingPicture, payload);
      yield put({
        type: 'saveRollingsPic',
        payload: list,
      });
    },
    *addRollingPictures({ payload }, { call }) {
      const response = yield call(addRollingsPic, payload);
      if (response.id) message.info('添加轮播图成功');
    },
    *addInfosList({ payload }, { call }) {
      const response = yield call(addNewsInfos, payload);
      if (response.id) message.info('添加轮播图成功');
    },
    *fetchInfosTagsList({ payload }, { call, put }) {
      const response = yield call(fetTagList, payload);
      const { newsLabel } = response;
      yield put({
        type: 'saveInfosTags',
        payload: newsLabel,
      });
    },
    *delInfosTags({ payload }, { call }) {
      const response = yield call(delInfosTags, payload);
      if (response.id > 0) {
        message.info('删除成功');
      }
      yield call(fetTagList, {
        limit: 99,
        page: 1,
      });
    },
    *addInfosTags({ payload }, { call }) {
      const response = yield call(addInfosTags, payload);
      yield call(fetTagList, {
        limit: 99,
        page: 1,
      });
      if (response.id > 0) {
        message.info('添加成功');
      }
    },
    *putInfosTags({ payload }, { call }) {
      const { response } = yield call(putInfosTags, payload);
      if (response.id > 0) {
        message.info('修改成功');
      }
    },
    *fetchNewsList({ payload }, { call, put }) {
      const list = yield call(fetchNews, payload);
      const { news, total } = list;
      const ids = news.map((item: any) => {
        return item.id;
      });
      yield put({
        type: 'savePagesInfos',
        payload: total,
      });
      const enity = yield call(getNewsEnity, ids);
      yield put({
        type: 'saveNewsEnity',
        payload: enity,
      });
    },
    *changeNewsEnity({ payload }, { call, put }) {
      const { updateData, updateId } = payload;
      const reply = yield call(changeNews, updateData, updateId);
      yield put({
        type: 'fetchNewsList',
        payload: {
          limit: 99,
          page: 1,
        },
      });
      if (reply) {
        yield message.success('修改成功');
      } else {
        yield message.error('修改失败');
      }
    },
  },

  reducers: {
    saveRollingsPic(state: any, { payload }: any) {
      return {
        ...state,
        RollingsEnity: payload,
      };
    },
    saveInfosTags(state: any, { payload }: any) {
      return {
        ...state,
        InfosTags: payload,
      };
    },
    saveNewsEnity(state: any, { payload }: any) {
      return {
        ...state,
        NewsEnity: payload,
      };
    },
    savePagesInfos(state: any, { payload }: any) {
      return {
        ...state,
        pagination: payload,
      };
    },
  },
};

export default RollingPictureModal;
