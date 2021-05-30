/*
 * @Author: your name
 * @Date: 2021-05-15 14:47:07
 * @LastEditTime: 2021-05-15 14:51:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/services/test/test.ts
 */

import request from '@/utils/request'

export async function getInfosList(payload) {
    return request('/api.farm/news/info/list', {
      method: 'GET',
      params: payload,
    });
  }
  export async function MgetInfosEnity(payload) {
    return request('/api.farm/news/info/_mget', {
      method: 'POST',
      data: { ids: payload },
    });
  }

  export async function addInfosEnity(payload) {
    return request('/api.farm/news/info/create', {
      method: 'POST',
      data: payload,
    });
  }
  