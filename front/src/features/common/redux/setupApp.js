import {
  COMMON_SETUP_APP_BEGIN,
  COMMON_SETUP_APP_SUCCESS,
  COMMON_SETUP_APP_FAILURE,
  COMMON_SETUP_APP_DISMISS_ERROR,
} from './constants';

import { LOGIN_LOGIN_ACTION_SUCCESS } from '../../login/redux/constants';

import history from '../../../common/history';
import { syncSessions } from '../../home/redux/actions';
import { isUserLoggedIn } from '../../../common/api';

export function setupApp() {
  return async (dispatch, getState) => {
    const { setupAppPending } = getState().common;
    // optionally you can have getState as the second argument
    if (setupAppPending) {
      dispatch({
        type: COMMON_SETUP_APP_BEGIN,
      });

      const loggedUser = await isUserLoggedIn();
      if (!loggedUser) return history.replace('/login');
      dispatch({ type: LOGIN_LOGIN_ACTION_SUCCESS, payload: { token: loggedUser.uid } }); // save the user id on the store. Previously it was a token, but since we moved to firestore is just the userID
      dispatch(syncSessions());
    }
    dispatch({ type: COMMON_SETUP_APP_SUCCESS });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSetupAppError() {
  return {
    type: COMMON_SETUP_APP_DISMISS_ERROR,
  };
}

/**
 *
 *
 * @export
 * @param {typeof import('./initialState').default} state
 * @param {{type: string, payload: Object}} action
 * @return {typeof import('./initialState').default}
 */
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
        loggedIn: true,
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
