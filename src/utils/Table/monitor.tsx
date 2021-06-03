/*
 * @Author: your name
 * @Date: 2021-06-03 16:33:12
 * @LastEditTime: 2021-06-03 16:54:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/Table/monitor.ts
 */


export const UrlsRank = [
    {
        title: 'url',
        dataIndex: 'name'
    },
    {
        title: '访问量',
        dataIndex: 'value',
        sorter: {
            compare: (a, b) => a.value - b.value,
            multiple: 2,
          },
    },{
        title: '用户数',
        dataIndex: 'uv'
    }
]