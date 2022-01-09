import {
  LOGIN_LOGIN_ACTION_BEGIN,
  LOGIN_LOGIN_ACTION_SUCCESS,
  LOGIN_LOGIN_ACTION_FAILURE,
  LOGIN_LOGIN_ACTION_DISMISS_ERROR,
} from './constants';

import { push } from 'connected-react-router';
import * as api from '../../../common/api';
import { getErrorData } from '../../../common/getErrorData';

type Props = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function loginAction({
  email,
  password,
  isGoogleLogin = false,
}: Props & { isGoogleLogin: boolean }) {
  return async dispatch => {
    dispatch({
      type: LOGIN_LOGIN_ACTION_BEGIN,
    });

    let error, response;

    if (isGoogleLogin) {
      ({ error, response } = await api.googleLogin());
    } else {
      ({ error, response } = await api.login({ email, password }));
    }

    if (error) {
      console.error('Error logging in:', error);
      dispatch({
        type: LOGIN_LOGIN_ACTION_FAILURE,
        payload: { error },
      });
      return;
    }

    // if (rememberMe) localStorage.setItem('token', response?.token?.toString() || '');

    dispatch({
      type: LOGIN_LOGIN_ACTION_SUCCESS,
      payload: { token: response.token },
    });
    dispatch(push('/'));
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoginActionError() {
  return {
    type: LOGIN_LOGIN_ACTION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOGIN_LOGIN_ACTION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loginActionPending: true,
        loginActionError: null,
      };

    case LOGIN_LOGIN_ACTION_SUCCESS:
      // The request is success
      return {
        ...state,
        token: action.payload.token,
        loginActionPending: false,
        loginActionError: null,
      };

    case LOGIN_LOGIN_ACTION_FAILURE:
      // The request is failed
      return {
        ...state,
        loginActionPending: false,
        loginActionError: getErrorData(action.payload.error).title,
      };

    case LOGIN_LOGIN_ACTION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loginActionError: null,
      };

    default:
      return state;
  }
}
