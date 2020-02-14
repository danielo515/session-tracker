import {
    COMMON_SETUP_APP_BEGIN,
    COMMON_SETUP_APP_SUCCESS,
    COMMON_SETUP_APP_FAILURE,
    COMMON_SETUP_APP_DISMISS_ERROR,
  } from './constants';

  import { LOGIN_LOGIN_ACTION_SUCCESS } from '../../login/redux/constants'

  import * as api from '../../../common/api';
  import history from '../../../common/history';
  
  const isExpired = token => {
    const [, payload] = token.split('.');
    const tokenInfo = JSON.parse(atob(payload));
    return tokenInfo.exp < (Date.now() / 100 | 0);
  };
  
  export function setupApp() {
    return async (dispatch, getState) => {
      // optionally you can have getState as the second argument
      dispatch({
        type: COMMON_SETUP_APP_BEGIN,
      });
  
      const storeToken = getState().login.token; // the token from the store!
      const savedToken = storeToken || localStorage.getItem('token');
      if (!savedToken) return history.replace('/login');
  
      const { error } = await api.me({ token: savedToken });
  
      if (error) {
        dispatch({
          type: COMMON_SETUP_APP_FAILURE,
          payload: { error },
        });
        const authRelated = (/authorization/i).test(((error.data||{}).errors||[{}])[0].code)
        if (error.status === 401 || authRelated) {
          localStorage.removeItem('token');
          history.replace('/login');
        }
        return
      }
  
      dispatch({ type: COMMON_SETUP_APP_SUCCESS });
      if (!storeToken) dispatch({ type: LOGIN_LOGIN_ACTION_SUCCESS, payload: { token: savedToken } }); // save the token on the store!
    };
  }
  
  // Async action saves request error by default, this method is used to dismiss the error info.
  // If you don't want errors to be saved in Redux store, just ignore this method.
  export function dismissSetupAppError() {
    return {
      type: COMMON_SETUP_APP_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, { type, payload }) {
    switch (type) {
      case COMMON_SETUP_APP_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          setupAppPending: true,
          setupAppError: null,
        };
  
      case COMMON_SETUP_APP_SUCCESS:
        // The request is success
        return {
          ...state,
          setupAppPending: false,
          setupAppError: null,
          loggedIn: true
        };
  
      case COMMON_SETUP_APP_FAILURE:
        // The request is failed
        return {
          ...state,
          setupAppPending: false,
          setupAppError: payload.error,
        };
  
      case COMMON_SETUP_APP_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          setupAppError: null,
        };
  
      default:
        return state;
    }
  }