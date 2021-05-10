/*
 * @Author: your name
 * @Date: 2021-04-19 16:46:29
 * @LastEditTime: 2021-05-10 18:32:55
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
                name: '党建中心',
                icon: 'table',
                path: '/party',
                // component: './Party/index.tsx',
                routes:[
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
                  },
                ]
              },
              {
                component: './404',
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
