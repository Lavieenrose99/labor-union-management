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
                redirect: '/monitor',
              },
              {
                path: '/monitor',
                name: '监控页面',
                icon: 'crown',
                component: './Monitor',
                // authority: ['admin'],
                routes: [
                  {
                    path: '/monitor/index',
                    name: '监控页面',
                    icon: 'smile',
                    component: './Monitor/index.tsx',
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
                routes: [
                  {
                    path: '/party/index',
                    name: '课程列表',
                    component: './Party/index.tsx',
                  },
                  {
                    path: '/party/course/index',
                    name: '班级中心',
                    component: './Class/index',
                  },
                  // {
                  //   path: '/party/create',
                  //   name: '创建课程',
                  //   icon: 'smile',
                  //   component: './Party/create.tsx',
                  // },
                ],
              },
              {
                name: '商品中心',
                icon: 'table',
                path: '/shop',
                // component: './Party/index.tsx',
                routes: [
                  {
                    path: '/shop/goods/index',
                    name: '商品列表',
                    component: './Goods/index'
                  },
                ]
              },
              {
                name: '订单中心',
                icon: 'table',
                path: '/payment',
                routes: [
                  {
                    path: '/payment/order/index',
                    name: '订单列表',
                    component: './Order/index'
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
