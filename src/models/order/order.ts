/*
 * @Author: SolitaryOrz 
 * @Date: 2021-05-30 17:46:52 
 * @Last Modified by: SolitaryOrz
 * @Last Modified time: 2021-05-30 21:51:48
 */

import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import {
  fetchOrderId,
  getOrderEnity,
  cancelOrderEnity,
} from '@/services/order/order';

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
    fetchOrderList: Effect;
    cancelOrderEnity: Effect
  };
  reducers: {
    saveOrderEnity: Reducer;
    savePagesInfos: Reducer;
  };
}

const OrderModal: AccountModelType = {
  namespace: 'ordermodel',
  state: {
    status: false,
  },
  effects: {
    *fetchOrderList({ payload }, { call, put }) {
      const list = yield call(fetchOrderId, payload);
      const { orders, total } = list;
      const ids = orders.map((item: any) => {
        return item.id;
      });
      yield put({
        type: 'savePagesInfos',
        payload: total,
      });
      const enity = yield call(getOrderEnity, ids);
      yield put({
        type: 'saveOrderEnity',
        payload: enity,
      });
    },
    *cancelOrderEnity({ payload }, {call, put}) {
      const { params, id } = payload
      const res = yield call(cancelOrderEnity, id);
      if(res.id > 0) {
        message.info('取消成功');
      }
      yield put({
        type: 'fetchOrderList',
        payload: params
      })
    }
  },

  reducers: {
    saveOrderEnity(state: any, { payload }: any) {
      return {
        ...state,
        OrderEnity: payload,
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

export default OrderModal;
