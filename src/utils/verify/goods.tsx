import { message } from "antd";

export const goodsCheck = (name: string, cover: any) => {
  let flag = true;
  if(name === '') {
    flag = false;
    message.info('请填写商品名称');
  }
  if(cover[0] === undefined) {
    flag = false;
    message.info('请上传商品封面')
  }
  return flag;
}