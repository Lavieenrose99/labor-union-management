/*
 * @Author: your name
 * @Date: 2021-05-15 20:22:37
 * @LastEditTime: 2021-05-31 14:22:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/config/defaultSettings.ts
 */
import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '惠福',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;
