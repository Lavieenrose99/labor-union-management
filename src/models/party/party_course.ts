/*
 * @Author: your name
 * @Date: 2021-05-09 17:13:05
 * @LastEditTime: 2021-05-29 17:05:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/models/party/party_course.ts
 */
import type { Effect, Reducer } from 'umi';
import { history } from 'umi'
import { message } from 'antd';
import { createPartyCouse,
    fetchPartyCourse ,
    getPartyCourseEnity,
    delPartyCourse,
    createPartyClass,
  createPartyGoods,
      fetchPartyGoods,
      getPartyGoods} from '../../services/party/party_course'

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
        status: boolean
    }
    effects: {
        addPartyCourse: Effect;
        fetchPartyList: Effect;
        delPartyCourse: Effect;
        addPartyClass: Effect;
        addPartyGoods: Effect;
        fetchPartyGoodsList: Effect;

    };
    reducers: {
      savePagesInfos: Reducer<AccountModalState>;
      saveCoureseEnity: Reducer<AccountModalState>;
      changeUploadStatus: Reducer;
      saveCourseGoods: Reducer;
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
            payload: true
          })
          const response = yield call(createPartyCouse, payload);
          if (response.id > 0) {
            message.info('已成功添加');
            yield put({
              type: 'changeUploadStatus',
              payload: false
            })
            yield history.push('/success')
          }
        }, 
        *addPartyClass({ payload }, { call, put }) {
          const response = yield call(createPartyClass, payload);
          if (response.id > 0) {
            message.info('已成功添加');
          }
        }, 
        *addPartyGoods({ payload }, { call, put }) {
          const response = yield call(createPartyGoods, payload);
          if (response.id > 0) {
            message.info('已成功添加');
          }
        }, 
        *fetchPartyList({ payload }, { call ,put}){
            const list = yield call(fetchPartyCourse,payload)
            const { party_course, total } = list
            const ids = party_course.map((item: any)=>{
                return item.id
            })
            yield put({
              type: 'savePagesInfos',
              payload: total
            })
            const enity = yield call(getPartyCourseEnity,ids)
            yield put({
                type: 'saveCoureseEnity',
                payload: enity
            })


      },
      *delPartyCourse({ payload }, { call }){
        const response =  yield call(delPartyCourse,payload)
        if(response.id )
        {
        message.info('课程删除成功')
        }
         yield call(fetchPartyCourse,{
           page: 1,
           limit: 10,
         })
      },
      *fetchPartyGoodsList({ payload }, { call ,put}){
        const list = yield call(fetchPartyGoods,payload)
        const { goods } = list
        const ids = goods.map((item: any)=>{
            return item.id
        })
        const enity = yield call(getPartyGoods,ids)
        yield put({
            type: 'saveCourseGoods',
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
        saveCourseGoods(state: any, { payload }: any){
          return {
            ...state,
            CourseGoods: payload
          }
        },
        changeUploadStatus(state: any, { payload }: any){
          return {
            ...state,
            status: payload
          }
        },
        savePagesInfos(state: any, { payload }: any){
          return {
            ...state,
            pagination: payload
          }
        }
      },
}

export default PartyCourseModal

