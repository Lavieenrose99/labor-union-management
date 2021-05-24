/*
 * @Author: your name
 * @Date: 2021-05-19 10:53:05
 * @LastEditTime: 2021-05-24 15:40:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/services/set_center/setCenter.ts
 */
/*
 * @Author: your name
 * @Date: 2021-05-09 17:12:43
 * @LastEditTime: 2021-05-19 10:53:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/services/party/party_course.ts
 */

import request from '@/utils/request'



export type PartyCoruseParamsType = {
   party_course_name: string,
   party_course_person: string,
   party_course_ppt: string,
   party_course_video: string

 };

export type NewsInfosType = {
   news_label: string,
   title: string,
   content: string,
   is_publish: boolean,
   introduction: string

} 

 export type RollingPictureLimitType = {
     limit: number,
     page: number
 }

export async function addRollingsPic(params: PartyCoruseParamsType){

   return request('/api.request/party_course/picture',{
     method: 'PUT',
     data: {course_list:params}
   }
   )

}

export async function fetchRollingPicture(params: RollingPictureLimitType){
   return request('/api.request/party_course/picture',{
       method: 'GET',
       params
   })
}


export async function delRollingPicture(id: number){
   return request(`/api.request/party_course/info/${id}`,{
   method: 'DELETE',
   }
   )
}

export async function addNewsInfos(params: NewsInfosType){
   return request('api.request/v1/news',{
      method: "POST",
      data: params
   })
}