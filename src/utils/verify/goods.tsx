import { message } from "antd";

export const goodsCheck = (name: string, price: any, inventory: any, cover: any, brief: string) => {
  let flag = true;
  if(!name) {
    flag = false;
    message.warning('请填写商品名称');
  }
  if(!price && price !== 0) {
    flag = false;
    message.warning('请填写商品价格');
  }
  if(!inventory && inventory !== 0) {
    flag = false;
    message.warning('请填写商品库存');
  }
  if(!cover) {
    flag = false;
    message.warning('请上传商品封面')
  }
  if(!brief || brief === '<p><br></p>') {
    flag = false;
    message.warning('请填写商品简介')
  }
  return flag;
}