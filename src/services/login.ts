/*
 * @Author: your name
 * @Date: 2021-04-19 16:46:29
 * @LastEditTime: 2021-06-01 16:39:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/services/login.ts
 */
import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function AccountLogin(params: LoginParamsType) {
  return request('/api.request/v1/account/login/login_by_email', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
