/*
 * @Author: your name
 * @Date: 2021-05-09 17:12:43
 * @LastEditTime: 2021-05-10 17:06:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/services/party/party_course.ts
 */

 import request from '@/utils/request'
import { method } from 'lodash';


 export type PartyCoruseParamsType = {
    party_course_name: string,
    party_course_person: string,
    party_course_ppt: string,
    party_course_video: string

  };

  export type PartyCourseLimitType = {
      limit: number,
      page: number
  }

export async function createPartyCouse(params: PartyCoruseParamsType){

    return request('/api.request/party_course/info',{
      method: 'POST',
      data: params
    }
    )

}

export async function fetchPartyCourse(params: PartyCourseLimitType){
    return request('/api.request/party_course/info/list',{
        method: 'GET',
        params
    })
}


export async function getPartyCourseEnity(params){
    return request('/api.request/party_course/info/_mget',{
        method: 'POST',
        data: {'ids':params}
    })
}

export async function delPartyCourse(id: number){
    return request(`/api.request/party_course/info/${id}`,{
    method: 'DELETE',
    }
    )
}