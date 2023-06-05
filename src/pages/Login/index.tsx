import {
  AlipayCircleOutlined,
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useEffect } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { connect, Dispatch, useIntl, FormattedMessage,history } from 'umi';
import { StateType } from '@/models/login';
import { getFakeCaptcha, LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';

import styles from './index.less';

interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

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
  useEffect(()=>{
    /* if(localStorage.getItem('userInfo'))
    history.replace('/') */
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  },[])
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
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
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      >
        <Tabs activeKey='account' >
          <Tabs.TabPane
            key="account"
            tab='账户密码登录'
          />
        </Tabs>

        {status === 'error' && !submitting && (
          <LoginMessage
            content='账户或密码错误（yuanrui/331588)'
          />
        )}


            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder='用户名: yuanrui'
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockTwoTone className={styles.prefixIcon} />,
              }}
              placeholder='密码: 331588'
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />


      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
