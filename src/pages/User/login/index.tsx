import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Button } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import type { Dispatch } from 'umi';
import request from '@/utils/request';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';
import SignUpPages from './createLoginUser';
import { get } from 'lodash'

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const intl = useIntl();
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmit = async(values: LoginParamsType) => {
    const { dispatch } = props;

 
    await request('/api.request/v1/account/login/login_by_email', {
      method: 'POST',
      data: {
        email: values.email,
        password: values.password,
      },
    }).then((num) => {
      if (num.id > 1) {
        message.info('登陆成功！');
      } else {
        message.error('请检查账号密码是否有误');
      }
    })
    await dispatch({
      type: 'partyaccount/getLoginUserInfos'
    })
    
    await dispatch({
      type: 'login/login',
      payload: { ...values },
    });
    await dispatch({
      type: 'partyaccount/getAccountList',
      payload: {
        page: 1,
        limit: 99
      }
    })


 

  
};
  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: '账户或密码错误（admin/ant.design)',
            })}
          />
        )}

        <>
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
              defaultMessage: '账户邮箱',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户注册邮箱!"
                  />
                ),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '密码: ',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
            ]}
          />
        </>
      </ProForm>
      <Button
        className={styles.createloginuser}
        style={{ marginRight: '23px' }}
        type="primary"
        size="large"
        onClick={() => showModal()}
      >
        创建用户
      </Button>
      <SignUpPages ModalVisible={isModalVisible} isShow={showModal} />
    </div>
  );
};

export default connect(({ login, loading, partyaccount}: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
  AccountList: get(partyaccount,'AccountInfos',[]),
  UserInfos: get(partyaccount,'UserInfos',{})
}))(Login);
