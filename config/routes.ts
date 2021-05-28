﻿/*
 * @Author: your name
 * @Date: 2021-04-19 16:46:29
<<<<<<< HEAD
<<<<<<< HEAD
 * @LastEditTime: 2021-05-15 14:44:59
=======
 * @LastEditTime: 2021-05-24 15:31:11
>>>>>>> 18ed83d7ab8d585c99ad31ad2c15d9d179265b02
=======
 * @LastEditTime: 2021-05-25 12:32:12
>>>>>>> e0409bdf6e86ba22eeb214ef8ec2dbf3515e9023
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/config/routes.ts
 */
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        // component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            // authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/admin',
              },
              {
                path: '/admin',
                name: '监控页面',
                icon: 'crown',
                component: './Admin',
                // authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    // authority: ['admin'],
                  },
                ],
              },
              {
                path: '/set',
                name: '配置页面',
                icon: 'crown',
                // /component: './Admin',
                // authority: ['admin'],
                routes: [
                  {
                    path: '/set/rolling_picture',
                    name: '轮播图设置',
                    icon: 'smile',
                    component: './SetCenter/rolling_picture',
                    // authority: ['admin'],
                  },
                  {
                    path: '/set/news',
                    name: '资讯设置',
                    icon: 'smile',
                    component: './News/index',
                    // authority: ['admin'],
                  },
                ],
              },
              
              {
                name: '党建中心',
                icon: 'table',
                path: '/party',
                // component: './Party/index.tsx',
                routes:[
                  {
                    path: '/party/course/index',
                    name: '班级中心',
                    component: './Class/index'
                  },
                  {
                    path: '/party/index',
                    name: '课程列表',
                    component: './Party/index.tsx'
                  }
                  ,
                  {
                    path: '/party/create',
                    name: '创建课程',
                    icon: 'smile',
                    component: './Party/create.tsx'
                  }

                ]
              },
              {
                name: '练习测试',
                icon: 'table',
                path: '/test',
                // component: './Party/index.tsx',
                routes:[
                  {
                    path: '/test/index',
                    name: '课程列表',
                    component: './test/index.tsx'
                  }
                ]
              },
              {
                path: 'success',
               component: '../utils/public/success',
              },
            ],
          },
          { 
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
