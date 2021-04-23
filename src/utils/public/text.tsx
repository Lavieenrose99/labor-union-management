/*
 * @Author: your name
 * @Date: 2021-04-22 15:49:01
 * @LastEditTime: 2021-04-22 15:49:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/public/text.ts
 */
import React from 'react';
import './text.less';

const LabelFix = (props) => {
  return (
    <div className="Form-label-showing">{props.text}</div>
  );
};

export {
  LabelFix
};
