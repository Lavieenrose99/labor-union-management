/*
 * @Author: your name
 * @Date: 2021-05-31 17:31:11
 * @LastEditTime: 2021-05-31 18:30:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/services/set_center/account.ts
 */


import request from '@/utils/request';

type Pagenations = {
    limit: number
    page: number
}

// type IAccountType{

// }

export async function fetchAccountList(params: Pagenations) {
    return request('/api.request/v1/account/info/list', {
      method: 'GET',
      params,
    });
  }

export async function mGetAccountEnity(params: { 'ids': number[]}){
    return request('/api.request/v1/account/info/_mget',{
        method: 'POST',
        data: {'ids':params}
    })
}

export async function getLoginUserInfos(){
    return request('/api.request/v1/account/info/get',{
        method: 'GET'
    })
}