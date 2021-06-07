/*
 * @Author: your name
 * @Date: 2021-05-09 17:13:05
 * @LastEditTime: 2021-06-07 18:18:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/models/party/party_course.ts
 */
import type { Effect, Reducer } from 'umi';
import { history } from 'umi';
import { message } from 'antd';
import {
  createPartyCouse,
  fetchPartyCourse,
  getPartyCourseEnity,
  delPartyCourse,
  createPartyClass,
  fetchPartyClass,
  getPartyClassEnity,
  delPartyClass,
  createPartyGoods,
  fetchPartyGoods,
  getPartyGoods,
  delPartyGoods,
  changePartyGoods,
  PutPartyCouse
} from '../../services/party/party_course';
import { map } from 'lodash';

export interface AccountModalState {
  pagination: {
    limit: undefined;
    total: undefined;
    page: undefined;
  };
}

export interface AccountModelType {
  namespace: 'partycourse';
  // state: AccountModelState;
  state: {
    status: boolean;
  };
  effects: {
    addPartyCourse: Effect;
    fetchPartyList: Effect;
    delPartyCourse: Effect;
    addPartyClass: Effect;
    fetchClassList: Effect;
    delPartyClass: Effect;
    addPartyGoods: Effect;
    fetchPartyGoods: Effect;
    deletePartyGoods: Effect;
    changePartyGoods: Effect;
    getPartyListById: Effect;
    PutOnPartyGoods: Effect;
    putPartyCourse: Effect;
    getPartyGoodsById: Effect;
  };
  reducers: {
    savePagesInfos: Reducer<AccountModalState>;
    saveCoureseEnity: Reducer<AccountModalState>;
    changeUploadStatus: Reducer;
    saveClassEnity: Reducer<AccountModalState>;
    savePartyGoods: Reducer;
    savePageTotal: Reducer;
  };
}

const PartyCourseModal: AccountModelType = {
  namespace: 'partycourse',
  state: {
    status: false,
  },
  effects: {
    *addPartyCourse({ payload }, { call, put }) {
      yield put({
        type: 'changeUploadStatus',
        payload: true,
      });
      const response = yield call(createPartyCouse, payload);
      if (response.id > 0) {
        message.info('已成功添加');
        yield put({
          type: 'changeUploadStatus',
          payload: false,
        });
        yield history.push('/success');
      }
    },
    *putPartyCourse({ payload }, { call, put }) {
      const response = yield call(PutPartyCouse, payload);
      if(response.id > 0){
        message.info('修改成功')
      }
      yield put({
        type: 'fetchPartyList',
        payload: {
          limit: 10,
          page: 1
        }
      })
    },
    *addPartyGoods({ payload }, { call, put }) {
      const response = yield call(createPartyGoods, payload);
      if (response.id > 0) {
        message.info('成功添加商品');
        yield put({
          type: 'fetchPartyGoods',
          payload: {
            limit: 20,
            page: 1
          }
        })
      }
    },
    *fetchPartyGoods({ payload }, { call, put }) {
      const response = yield call(fetchPartyGoods, payload);
      const { goods } = response;
      const ids = map(goods, 'id');
      const enity = yield call(getPartyGoods, ids);
      yield put({
        type: 'savePartyGoods',
        payload: enity,
      });
    },
    *getPartyGoodsById({ ids }, { call, put }) {
      const enity = yield call(getPartyGoods, ids);
      yield put({
        type: 'savePartyGoods',
        payload: enity,
      });
    },
    // 下架商品
    *deletePartyGoods({ payload }, { call, put }) {
      const res = yield call(delPartyGoods, payload);
      if (res.id) {
        message.info('下架商品成功');
      }
      yield put({
        type: 'fetchPartyGoods',
        payload: {
          page: 1,
          limit: 20,
        }
      });
    },
    // 上架商品
    *PutOnPartyGoods({ payload }, { call, put }) {
      const { params, updateId } = payload;
      const res = yield call(changePartyGoods, params, updateId);
      if(res.id) {
        message.info('上架商品成功')
      }
      yield put({
        type: 'fetchPartyGoods',
        payload: {
          page: 1,
          limit: 20,
        }
      })
    },
    *changePartyGoods({payload}, {call, put}) {
      const { params, updateId } = payload;
      const res = yield call(changePartyGoods, params, updateId);
      if(res.id) {
        message.info('修改商品信息成功')
      }
      yield put({
        type: 'fetchPartyGoods',
        payload: {
          page: 1,
          limit: 20,
        }
      })
    },
    *addPartyClass({ payload }, { call, put }) {
      const response = yield call(createPartyClass, payload);
      if (response.id > 0) {
        message.info('已成功添加');
      }
      yield put({
        type: 'fetchClassList',
        payload: {
          limit: 10,
          page: 1
        }
      })
    },
    *fetchPartyList({ payload }, { call, put }) {
      const list = yield call(fetchPartyCourse, payload);
      const { party_course, total } = list;
      const ids = party_course.map((item: any) => {
        return item.id;
      });
      yield put({
        type: 'savePagesInfos',
        payload: total,
      });
      const enity = yield call(getPartyCourseEnity, ids);
      yield put({
        type: 'saveCoureseEnity',
        payload: enity,
      });
    },
    *getPartyListById({ payload }, { call, put }) {
      const enity = yield call(getPartyCourseEnity, payload);
      yield put({
        type: 'saveCoureseEnity',
        payload: enity,
      });
    },
    *delPartyCourse({ payload }, { call, put }) {
      const response = yield call(delPartyCourse, payload);
      if (response.id) {
        message.info('课程删除成功');
      }
       yield put({
         type: 'fetchPartyList',
         payload: {
           limit: 10,
           page: 1
         }
       })
    },
    *fetchClassList({ payload }, { call, put }) {
      const list = yield call(fetchPartyClass, payload);
      const { classes, total } = list;
      const ids = map(classes,'id')
      const enity = yield call(getPartyClassEnity, ids);
      const partyIds = map(enity,'party_course_id')
      const enityCourse = yield call(getPartyCourseEnity, partyIds);
      yield put({
        type: 'saveClassEnity',
        payload: enity,
      });
      yield put({
        type: 'savePageTotal',
        payload: total
      })
      yield put({
        type: 'saveCoureseEnity',
        payload: enityCourse ,
      });
    },
    *delPartyClass({ payload }, { call, put }) {
      const res = yield call(delPartyClass, payload);
      if (res.id) {
        message.info('班级删除成功');
      }
      yield put({
        type: 'fetchClassList',
        payload: {
          limit: 10,
          page: 1
        }
      })
    },
  },

  reducers: {
    saveCoureseEnity(state: any, { payload }: any) {
      return {
        ...state,
        CoureseEnity: payload,
      };
    },
    savePartyGoods(state: any, { payload }: any) {
      return {
        ...state,
        CourseGoods: payload,
      };
    },
    changeUploadStatus(state: any, { payload }: any) {
      return {
        ...state,
        status: payload,
      };
    },
    savePagesInfos(state: any, { payload }: any) {
      return {
        ...state,
        pagination: payload,
      };
    },
    saveClassEnity(state: any, { payload }: any) {
      return {
        ...state,
        ClassEnity: payload,
      };
    },
    savePageTotal(state: any, { payload }: any) {
      return {
        ...state,
        PageTotal: payload,
      };
    },
  },
};

export default PartyCourseModal;
