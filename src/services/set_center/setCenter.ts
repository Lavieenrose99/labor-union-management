

import request from '@/utils/request';

export type PartyCoruseParamsType = {
  party_course_name: string;
  party_course_person: string;
  party_course_ppt: string;
  party_course_video: string;
};

export type NewsInfosType = {
  news_label: number;
  title: string;
  content: string;
  is_publish: boolean;
  introduction: string;
  picture: string;
};

export type RollingPictureLimitType = {
  limit: number;
  page: number;
};

export type NewsLimitType = {
  limit: number;
  page: number;
};

export async function addRollingsPic(params: PartyCoruseParamsType) {
  return request('/api.request/party_course/picture', {
    method: 'PUT',
    data: { course_list: params },
  });
}

export async function fetchRollingPicture(params: RollingPictureLimitType) {
  return request('/api.request/party_course/picture', {
    method: 'GET',
    params,
  });
}

export async function delRollingPicture(id: number) {
  return request(`/api.request/party_course/info/${id}`, {
    method: 'DELETE',
  });
}
export async function delInfosTags(id: number) {
  return request(`/api.request/v1/news_label/${id}`, {
    method: 'DELETE',
  });
}

export async function putInfosTags(payload: any) {
  return request(`/api.request/v1/news_label/${payload.id}`, {
    method: 'PUT',
    data: { name: payload.data },
  });
}
export async function addInfosTags(payload: any) {
  return request(`/api.request/v1/news_label`, {
    method: 'POST',
    data: { name: payload },
  });
}

export async function addNewsInfos(params: NewsInfosType) {
  return request('api.request/v1/news', {
    method: 'POST',
    data: params,
  });
}

export async function fetchNews(params: NewsLimitType) {
  return request('/api.request/v1/news/list', {
    method: 'GET',
    params,
  });
}

export async function getNewsEnity(params: number[]) {
  return request('/api.request/v1/news/_mget', {
    method: 'POST',
    data: { ids: params },
  });
}

export async function changeNews(params: NewsInfosType, updateId: number) {
  return request(`/api.request/v1/news/${updateId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deleteNews(id: number) {
  return request(`/api.request/v1/news/${id}`, {
    method: 'DELETE',
  });
}

export async function fetTagList(params: RollingPictureLimitType) {
  return request('api.request/v1/news_label/list', {
    method: 'GET',
    params,
  });
}
