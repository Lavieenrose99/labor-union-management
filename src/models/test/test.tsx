/*
 * @Author: your name
 * @Date: 2021-05-15 14:46:43
 * @LastEditTime: 2021-05-15 16:58:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/models/test/test.tsx
 */
import type { Effect, Reducer } from 'umi';
import { history } from 'umi'
import { message } from 'antd';
import { 
    getInfosList,
    MgetInfosEnity
   } from '../../services/test/test'

export interface AccountModalState {
  pagination: {
    limit: undefined;
    total: undefined;
    page: undefined;
  };
}

export interface AccountModelType {
    namespace: 'Testcourse';
    // state: AccountModelState;
    state: {
        status: boolean
    }
    effects: {
        fetchTestList: Effect;
    }
    reducers: {
        saveCoureseEnity: Reducer<AccountModalState>;
    };
  }

const TestCourseModal: AccountModelType = {
    namespace: 'Testcourse',
    state: {
        status: false,
      },
    effects: {
       
        *fetchTestList({ payload }, { call ,put}){
            const list = yield call(getInfosList,payload)
            const { news } = list
            const ids = news.map((item: any)=>{
                return item.id
            })
            const enity = yield call(MgetInfosEnity,ids)
            yield put({
                type: 'saveCoureseEnity',
                payload: enity
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
      },
}

export default TestCourseModal
