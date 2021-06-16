import { message } from "antd";

export const newsCheck = (infoTitle: any, infoIntroduction: any, infoTag: any, cover: any, infoContent: any) => {
  let flag = true;
  if(!infoTitle) {
    flag = false;
    message.warning('请填写资讯标题');
  }
  if(!infoIntroduction) {
    flag = false;
    message.warning('请填写资讯摘要')
  }
  if(!infoTag) {
    flag = false;
    message.warning('请选择资讯标签')
  }
  if(!cover ) {
    flag = false;
    message.warning('请上传资讯封面')
  }
  if(!infoContent || infoContent === '<p><br></p>') {
    flag = false;
    message.warning('请填写资讯内容')
  }
  return flag;
}