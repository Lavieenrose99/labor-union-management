/*
 * @Author: your name
 * @Date: 2021-04-19 16:46:29
 * @LastEditTime: 2021-06-10 16:12:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/config/proxy.ts
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api.farm/': {
      target: 'https://api.fmg.net.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api.farm': '',
      },
    },
    '/api.request': {
      target: 'http://120.24.151.34:80/',
      pathRewrite: { '^/api.request': '' },
      changeOrigin: true,
    },
  '/api.monitor': {
    target: 'http://114.215.176.39:7001/',
    pathRewrite: { '^/api.monitor': ''},
    changeOrigin: true,
  }

  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api.farm/': {
      target: 'https://api.fmg.net.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api.farm': '',
      },
    },
    '/api.request': {
      target: 'http://120.24.151.34:80/',
      pathRewrite: { '^/api.request': '' },
      changeOrigin: true,
    },
    '/api.monitor': {
      target: 'http://114.215.176.39:7001/',
      pathRewrite: { '^/api.monitor': ''},
      changeOrigin: true,
    }
  },
};
