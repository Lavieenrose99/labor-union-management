/*
 * @Author: SolitaryOrz 
 * @Date: 2021-05-30 17:28:55 
 * @Last Modified by: SolitaryOrz
 * @Last Modified time: 2021-05-30 21:17:49
 */

import request from '@/utils/request'

export type OrderListLimitType = {
  author_id: number,
  status: number,
  start_time: number,
  end_time: number
};

export async function fetchOrderId(params: OrderListLimitType) {
  return request('/api.request/v1/order/list', {
    method: 'GET',
    params,
  });
}

export async function getOrderEnity(params: number[]) {
  return request('/api.request/v1/order/_mget', {
    method: 'POST',
    data: { ids: params },
  });
}

export async function cancelOrderEnity(id: number) {
  return request(`/api.request/v1/order/${id}`, {
    method: 'PUT',
  });
}