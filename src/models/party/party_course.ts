/*
 * @Author: your name
 * @Date: 2021-05-09 17:13:05
 * @LastEditTime: 2021-05-10 00:09:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/models/party/party_course.ts
 */
import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { createPartyCouse,
    fetchPartyCourse ,
    getPartyCourseEnity} from '../../services/party/party_course'
import { get } from 'lodash'


export interface AccountModelType {
    namespace: 'partycourse';
    // state: AccountModelState;
    state: {
        status: undefined
    }
    effects: {
        addPartyCourse: Effect;
        fetchPartyList: Effect;

    };
    reducers: {
      savePagesInfos: Reducer;
    };
  }

const PartyCourseModal: AccountModelType = {
    namespace: 'partycourse',
    state: {
        status: undefined,
      },
    effects: {
       
        *addPartyCourse({ payload }, { call, put }) {
          const response = yield call(createPartyCouse, payload);
          if (response.status === 'success') {
            message.info('已成功发送');
          }
        }, 
        *fetchPartyList({ payload }, { call ,put}){
            const list = yield call(fetchPartyCourse,payload)
            const { party_course } = list
            const ids = party_course.map((item: any)=>{
                return item.id
            })
            const enity = yield call(getPartyCourseEnity,ids)
            yield put({
                type: 'saveCoureseEnity',
                payload: enity
            })

      },
      },
     
    
      reducers: {
        saveCoureseEnity(state: any, { payload }) {
          return {
            ...state,
            CoureseEnity: payload,
          };
        },
      },
}

export default PartyCourseModal

