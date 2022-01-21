import {
  LOGIN_SIGN_UP_BEGIN,
  LOGIN_SIGN_UP_SUCCESS,
  LOGIN_SIGN_UP_FAILURE,
  LOGIN_SIGN_UP_DISMISS_ERROR,
} from './constants';

import * as api from '../../../common/api';
import history from '../../../common/history';
import { State } from './initialState';
import { AppDispatch } from '@common/configStore';

/**
 * signs up the user
 */
export function signUp({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: LOGIN_SIGN_UP_BEGIN,
    });

    //@ts-expect-error TODO restore signUp
    const { error, response } = await api.signUp({ email, password, name });

    if (error) {
      dispatch({
        type: LOGIN_SIGN_UP_FAILURE,
        payload: { error },
      });
      return;
    }
    dispatch({
      type: LOGIN_SIGN_UP_SUCCESS,
      payload: response,
    });

    history.replace('/login');
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSignUpError() {
  return {
    type: LOGIN_SIGN_UP_DISMISS_ERROR,
  };
}

export function reducer(state: State, action: any) {
  switch (action.type) {
    case LOGIN_SIGN_UP_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signUpPending: true,
        signUpError: null,
      };

    case LOGIN_SIGN_UP_SUCCESS:
      // The request is success
      return {
        ...state,
        signUpPending: false,
        signUpError: null,
      };

    case LOGIN_SIGN_UP_FAILURE:
      // The request is failed
      return {
        ...state,
        signUpPending: false,
        signUpError: action.payload.error,
      };

    case LOGIN_SIGN_UP_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signUpError: null,
      };

    default:
      return state;
  }
}
