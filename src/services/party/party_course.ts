/*
 * @Author: your name
 * @Date: 2021-05-09 17:12:43
 * @LastEditTime: 2021-05-30 18:06:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/services/party/party_course.ts
 */

import request from '@/utils/request';

export type PartyCoruseParamsType = {
  party_course_name: string;
  party_course_person: string;
  party_course_ppt: string;
  party_course_video: string;
};

export type PartyCourseLimitType = {
  limit: number;
  page: number;
};

export type PartyCourseType = {
  name: string;
  price: string;
  cover: string;
  picture: string[];
  brief: string;
  is_on: boolean;
  inventory: number;
};

export async function createPartyCouse(params: PartyCoruseParamsType) {
  return request('/api.request/v1/party_course/info', {
    method: 'POST',
    data: params,
  });
}
export async function createPartyClass(payload: any) {
  return request(`/api.request/v1/party_course/${payload.id}/class`, {
    method: 'POST',
    data: payload.data,
  });
}
export async function createPartyGoods(payload: PartyCoruseParamsType) {
  return request(`/api.request/v1/goods`, {
    method: 'POST',
    data: payload,
  });
}

export async function fetchPartyCourse(params: PartyCourseLimitType) {
  return request('/api.request/v1/party_course/info/list', {
    method: 'GET',
    params,
  });
}

export async function getPartyCourseEnity(params: number[]) {
  return request('/api.request/v1/party_course/info/_mget', {
    method: 'POST',
    data: { ids: params },
  });
}
export async function fetchPartyGoods(params: PartyCourseLimitType) {
  return request('/api.request/v1/goods/list', {
    method: 'GET',
    params,
  });
}

export async function getPartyGoods(params: number[]) {
  return request('/api.request/v1/goods/_mget', {
    method: 'POST',
    data: { ids: params },
  });
}

export async function changePartyGoods(params: any, updateId: number) {
  return request(`/api.request/v1/goods/${updateId}`, {
    method: 'PUT',
    data: params
  });
}

export async function delPartyGoods(id: number) {
  return request(`/api.request/v1/goods/${id}`, {
    method: 'DELETE',
  });
}

export async function delPartyCourse(id: number) {
  return request(`/api.request/v1/party_course/info/${id}`, {
    method: 'DELETE',
  });
}

export async function fetchPartyClass(params: PartyCourseLimitType) {
  return request('/api.request/v1/party_course/class/list', {
    method: 'GET',
    params,
  });
}

export async function getPartyClassEnity(params: number[]) {
  return request('/api.request/v1/party_course/class/_mget', {
    method: 'POST',
    data: { ids: params },
  });
}
export async function delPartyClass(id: number) {
  return request(`/api.request/v1/party_course/class/${id}`, {
    method: 'DELETE',
  });
}
