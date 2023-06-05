import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.status === 'ok') {
        message.success('登陆成功');
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        history.replace('/');
      }
    },


    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      history.replace('/login');
      message.success('退出成功');
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      /*       setAuthority(payload.token); */
      localStorage.setItem('token', payload.token)
      return {
        ...state,
      };
    },
  },
};

export default Model;
