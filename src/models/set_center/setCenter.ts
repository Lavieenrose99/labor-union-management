/*
 * @Author: your name
 * @Date: 2021-05-19 10:57:15
 * @LastEditTime: 2021-05-24 15:50:14
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
import { fetchRollingPicture,
  addRollingsPic,
  addNewsInfos,
  fetchNews,
  getNewsEnity,
  changeNews,
  getNewsLabel } from '@/services/set_center/setCenter';

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
    fetchNewsList: Effect;
    changeNewsEnity: Effect;
    getNewsLabelList: Effect;
  };
  reducers: {
    saveRollingsPic: Reducer<AccountModalState>;
    savePagesInfos: Reducer<AccountModalState>;
    saveNewsEnity: Reducer<AccountModalState>;
    saveLabelList: Reducer<AccountModalState>;
  };
}

const RollingPictureModal: AccountModelType = {
  namespace: 'setcentermodel',
  state: {
    status: false,
  },
  effects: {
    *fetchRollingsList({ payload }, { call, put }) {
      console.log(1112121);
      const list = yield call(fetchRollingPicture, payload);
      // const ids = party_course.map((item: any)=>{
      //     return item.id
      // })
      // const enity = yield call(getRollingPictureEnity,ids)
      yield put({
        type: 'saveRollingsPic',
        payload: list,
      });
    },
    *addRollingPictures({ payload }, { call }) {
      console.log(1111);
      const response = yield call(addRollingsPic, payload);
      if (response.id) message.info('添加轮播图成功');
    },
    *addInfosList({ payload }, { call }) {
      console.log(1111);
      const response = yield call(addNewsInfos, payload);
      if (response.id) message.info('添加轮播图成功');
    },
    *fetchNewsList({ payload }, { call ,put}){
      const list = yield call(fetchNews, payload)
      const { news, total } = list
      const ids = news.map((item: any)=>{
          return item.id
      })
      // console.log('资讯列表ids:' + ids)
      yield put({
        type: 'savePagesInfos',
        payload: total
      })
      const enity = yield call(getNewsEnity, ids)
      // console.log('资讯列表mget:' + enity)
      yield put({
          type: 'saveNewsEnity',
          payload: enity
      })
    },
    *changeNewsEnity({payload}, {call}) {
      const { updateData, updateId } = payload;
      const reply = yield call(changeNews, updateData, updateId );
      if(reply) {
        yield message.success('修改成功');
      } else {
        yield message.error('修改失败');
      }
    },
    *getNewsLabelList({payload}, {call, put}) {
      const list = yield call(getNewsLabel, payload);
      const { newsLabel } = list;
      console.log('getNewsLabelList: ' + newsLabel);
      yield put({
        type: 'saveLabelList',
        payload: newsLabel
      })
    }
  },
  reducers: {
    saveRollingsPic(state: any, { payload }: any) {
      return {
        ...state,
        RollingsEnity: payload,
      };
    },
    saveNewsEnity(state: any, { payload }: any) {
      return {
        ...state,
        NewsEnity: payload,
      };
    },
    savePagesInfos(state: any, { payload }: any){
      return {
        ...state,
        pagination: payload
      }
    },
    saveLabelList(state: any, { payload }: any) {
      return {
        ...state,
        LabelList: payload,
      }
    }
  },
};

export default RollingPictureModal;
