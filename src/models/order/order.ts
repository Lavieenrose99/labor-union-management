/*
 * @Author: SolitaryOrz 
 * @Date: 2021-05-30 17:46:52 
 * @Last Modified by: SolitaryOrz
 * @Last Modified time: 2021-06-13 16:36:28
 */

import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import {
  fetchOrderId,
  getOrderEnity,
  cancelOrderEnity,
} from '@/services/order/order';
import { map } from 'lodash'

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
    searchOrderAuthor: Effect;
  };
  reducers: {
    saveOrderEnity: Reducer;
    saveOrderInfos: Reducer;
  };
}

const OrderModal: AccountModelType = {
  namespace: 'ordermodel',
  state: {
    status: false,
  },
  effects: {
    // 获取订单列表
    *fetchOrderList({ payload }, { call, put }) {
      const list = yield call(fetchOrderId, payload);
      const { orders, total } = list;
      const ids = orders.map((item: any) => {
        return item.id;
      });
      yield put({
        type: 'saveOrderInfos',
        payload: total
      });
      const enity = yield call(getOrderEnity, ids);
      yield put({
        type: 'saveOrderEnity',
        payload: enity,
      });
      yield put({
        type: 'partycourse/getPartyGoodsById',
        ids: Array.from(new Set(map(enity,'goods_id')))
      })
    },
    // 查询买家
    *searchOrderAuthor({ payload }, {call, put}) {
    },
    // 取消订单
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
    saveOrderInfos(state: any, { payload }: any) {
      return {
        ...state,
        OrderTotal: payload
      };
    },
  },
};

export default OrderModal;
