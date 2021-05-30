/*
 * @Author: your name
 * @Date: 2021-05-24 16:27:21
 * @LastEditTime: 2021-05-24 16:27:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/upload/filterHtml.ts
 */
export const filterHTMLTag = (htmlstr: any) => {
  // 正则匹配所有img标签
  // var regex0 = new RegExp("(i?)(\<img)([^\>]+\>)","gmi");
  // 正则匹配不含style="" 或 style='' 的img标签
  // const regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)", 'gmi');
  // //给不含style="" 或 style='' 的img标签加上style=""
  // htmlstr = htmlstr.replace(regex1, '$2 style=""$3');
  // //正则匹配含有style的img标签
  // const regex2 = new RegExp("(i?)(\<img.*?style=['\"])([^\>]+\>)", 'gmi');
  // 在img标签的style里面增加css样式(这里增加的样式：display:block;max-width:100%;height:auto;border:5px solid red;)
  // htmlstr = htmlstr.replace(regex2, '$2display:block;width:100%;height:auto;$3');
  htmlstr = htmlstr.replace(/<img/g, '<img style="max-width: 100% ; height: auto"');
  return htmlstr;
};
// 提取html文档中的文字
export const filterHTMLStr = (str: string) => {
  str.match(/\^+(?=<)/g);
  let result = str.match(/[^>]+(?=<)/g);
  result = result ? result.join(',') : '';
  if (result.length === 0) {
    result = '无文字信息请点击查看详情';
  }
  return result;
};
