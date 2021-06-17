/*
 * @Author: your name
 * @Date: 2021-04-27 14:48:00
 * @LastEditTime: 2021-06-17 19:05:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/Party/index.tsx
 */
import React, { useState, useEffect } from 'react';
import { UploadAntd } from '@/utils/upload/qiniu';
import { PageContainer } from '@ant-design/pro-layout';
import { BookTwoTone } from '@ant-design/icons';
import { Input, Button, Spin, Select, Form } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { get, map } from 'lodash';
import { IconFont, isEmptyName, openNotificationWithIcon } from '@/utils/public/tools';
import CreatorPartyCourse from '@/utils/upload/richTextUpload';
import './index.less';

interface PartyCourseProps {
  dispatch: Dispatch;
  UploadStatus: boolean;
  GoodsList: [];
}

const PartyShow: React.FC<PartyCourseProps> = (props) => {
  const { dispatch, UploadStatus, GoodsList } = props;
  const { Option } = Select;
  useEffect(() => {
    dispatch({
      type: 'partycourse/fetchPartyGoodsList',
      payload: {
        limit: 10,
        page: 1,
      },
    });
  }, []);

  const courseCoverS = localStorage.getItem('courseCover')
    ? map([...JSON.parse(String(localStorage.getItem('courseCover')))], 'url')
    : [];
  const pptStorage = localStorage.getItem('pptStorage')
    ? map([...JSON.parse(String(localStorage.getItem('pptStorage')))], 'url')
    : [];
  const videoStorage = localStorage.getItem('videoStorage')
    ? map([...JSON.parse(String(localStorage.getItem('videoStorage')))], 'url')
    : [];
  const [couseName, setCourseName] = useState('');
  const [coursePPT, setcoursePPT] = useState(pptStorage);
  const [courseVideo, setCourseVideo] = useState(videoStorage);
  const [coursebrief, setCourseBrief] = useState('测试简介');
  const [courseCover, setCourseCover] = useState(courseCoverS);
  const [linkGoods, setLinkGoods] = useState(0);
  const [courseWork, setCourseWork] = useState(localStorage.getItem('partyCourseInfos'));
  const handleSubmit: any = (e: any) => {
    const dataVerify = [{ 封面: courseCover }, { ppt: coursePPT }, { video: courseVideo }];
    if (!coursePPT.length || !courseVideo.length || !courseCover.length) {
      isEmptyName(dataVerify);
    } else {
      dispatch({
        type: 'partycourse/addPartyCourse',
        payload: {
          party_course_name: couseName,
          party_course_ppt: coursePPT,
          party_course_video: courseVideo,
          party_course_brief: coursebrief,
          party_course_cover: courseCover[0],
          party_course_work: courseWork,
          good_id: linkGoods,
        },
      });
      setCourseName('');
      setCourseVideo([]);
      setcoursePPT([]);
      localStorage.removeItem('partycourseinfos');
      localStorage.clear();
    }
  };
  const subscribeInfos = (text: any) => {
    localStorage.setItem('partyCourseInfos', text);
    setCourseWork(text);
  };
  return (
    <>
      <PageContainer
        extra={[
          <Button
            key="3"
            onClick={() => {
              openNotificationWithIcon('info', {
                message: '提醒',
                description: '该页面的缓存已删除，刷新后将不保存原信息',
              });
              localStorage.clear();
              location.reload();
            }}
            danger
          >
            清除缓存
          </Button>,
        ]}
      >
        <Spin spinning={UploadStatus}>
          <section className="party_course_upload_containter">
            <Form onFinish={handleSubmit}>
              <Form.Item
                label="课程名"
                name="party_course_name"
                rules={[{ required: true, message: '请输入课程名' }]}
              >
                <Input
                  placeholder="请输入课程名"
                  style={{ width: '60vw', marginBottom: '20px' }}
                  onChange={(e) => {
                    setCourseName(e.target.value);
                  }}
                  prefix={<BookTwoTone />}
                />
              </Form.Item>
              <Form.Item
                label="关联商品"
                name="good_id"
                rules={[{ required: true, message: '请选择关联商品' }]}
              >
                <Select
                  suffixIcon={<IconFont type="icon-shangpin" />}
                  className="party_goods_select"
                  onChange={(e: number) => setLinkGoods(e)}
                  placeholder="课程关联产品"
                >
                  {GoodsList.map((item: any) => {
                    return <Option value={item.id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="课程简介" rules={[{ required: true, message: '请输入课程简介' }]}>
                <Input.TextArea
                  maxLength={130}
                  placeholder="请在此填写课程简介130字以内"
                  style={{ width: '60vw', marginBottom: '20px' }}
                  onChange={(e) => {
                    setCourseBrief(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item label="课程封面" name="party_course_cover">
                <UploadAntd
                  fileStorage="courseCover"
                  showType="drag"
                  childFileType="picture"
                  dragSize="60vw"
                  listshowType="picture"
                  IntroText="上传课程封面"
                  fileCount={3}
                  setUrl={setCourseCover}
                />
              </Form.Item>
              <Form.Item label="课程PPT">
                <UploadAntd
                  fileStorage="pptStorage"
                  showType="drag"
                  childFileType="ppt"
                  dragSize="60vw"
                  listshowType="text"
                  IntroText="上传课程ppt文件"
                  fileCount={1}
                  setUrl={setcoursePPT}
                />
              </Form.Item>
              <Form.Item label="课程视频">
                <UploadAntd
                  fileStorage="videoStorage"
                  showType="drag"
                  childFileType="video"
                  dragSize="60vw"
                  listshowType="picture"
                  IntroText="上传课程视频文件"
                  fileCount={3}
                  setUrl={setCourseVideo}
                />
              </Form.Item>

              <Form.Item label="课程作业">
                <CreatorPartyCourse
                  height="40vh"
                  width="60vw"
                  subscribeRichText={subscribeInfos}
                  defaultText={courseWork}
                />
              </Form.Item>
              <Form.Item>
                <section className="submit_party_btn">
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </section>
              </Form.Item>
            </Form>
          </section>
        </Spin>
      </PageContainer>
    </>
  );
};

export default connect(({ partycourse }: any) => ({
  CoureseEnity: get(partycourse, 'CoureseEnity', []),
  UploadStatus: get(partycourse, 'status', false),
  GoodsList: get(partycourse, 'CourseGoods', []),
}))(PartyShow);
