/*
 * @Author: your name
 * @Date: 2021-05-31 17:36:08
 * @LastEditTime: 2021-05-31 22:47:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/models/set_center/account.ts
 */
import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import {
    fetchAccountList,
    mGetAccountEnity,
    getLoginUserInfos
} from '@/services/set_center/account';
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
       getAccountList: Effect;
       getLoginUserInfos: Effect;
  };
  reducers: {
    saveAccountInfos: Reducer;
    saveLoginUserInfos: Reducer;
  };
}

const RollingPictureModal: AccountModelType = {
  namespace: 'partyaccount',
  state: {
    status: false,
  },
  effects: {
     *getAccountList({ payload },{ call, put }){
         const response = yield call(fetchAccountList,payload)
         const { orders } = response
         const ids = map(orders,'id')
         const raw = yield call(mGetAccountEnity,ids)
         sessionStorage.setItem('accountList',JSON.stringify(raw))
        //  yield put({
        //      type: 'saveAccountInfos',
        //      payload: raw
        //  })
     },
     *getLoginUserInfos(_,{ call, put }){
         const response = yield call(getLoginUserInfos)
         sessionStorage.setItem('useInfos',JSON.stringify(response))
        //  yield put({
        //      type: 'saveLoginUserInfos',
        //      payload: response
        //  })
          

     }
  },

  reducers: {
      saveAccountInfos(state: any, { payload }){
          return {
              ...state,
              AccountInfos: payload
          }
      },
      saveLoginUserInfos(state: any, { payload }){
        return {
            ...state,
            UserInfos: payload
        }
    }
  },
};

export default RollingPictureModal;
