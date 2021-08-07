import {
  LOGIN_SIGN_UP_BEGIN,
  LOGIN_SIGN_UP_SUCCESS,
  LOGIN_SIGN_UP_FAILURE,
  LOGIN_SIGN_UP_DISMISS_ERROR,
} from './constants';

import * as api from '../../../common/api';
import history from '../../../common/history';

/**
 * signs up the user
 *
 * @export
 * @template {import('redux').Dispatch<{type: string}>} Dispatch
 * @param  {{ email: string, password: string, name: string} } args
 * @return {(dispatch: Dispatch)=> Promise<*>}
 */
export function signUp({
  email,
  password,
  name
}: any) {
  return async (dispatch: any) => {
    dispatch({
      type: LOGIN_SIGN_UP_BEGIN,
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'error' does not exist on type 'void'.
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

/**
 *
 *
 * @export
 * @template {typeof import('./initialState').default} State
 * @param {State} state
 * @param {*} action
 * @return {State}
 */
export function reducer(state: any, action: any) {
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
