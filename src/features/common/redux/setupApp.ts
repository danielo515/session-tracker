import {
  COMMON_SETUP_APP_BEGIN,
  COMMON_SETUP_APP_SUCCESS,
  COMMON_SETUP_APP_FAILURE,
  COMMON_SETUP_APP_DISMISS_ERROR,
} from './constants';

import { LOGIN_LOGIN_ACTION_SUCCESS } from '../../login/redux/constants';
import { State } from './initialState';
import history from '../../../common/history';
import { syncSessions } from '../../home/redux/actions';
import homeSetup from '../../home/redux/setup';
import { isUserLoggedIn } from '@common/isUserLoggedIn';
import { fetchAllDefinitions } from 'features/session-definition/redux/fetchAll';

export function setupApp() {
  // @ts-expect-error TODO make to toolkit
  return async (dispatch, getState) => {
    const { setupAppPending } = getState().common;
    if (setupAppPending) {
      dispatch({
        type: COMMON_SETUP_APP_BEGIN,
      });

      const loggedUser = await isUserLoggedIn();
      if (!loggedUser) {
        dispatch({ type: COMMON_SETUP_APP_FAILURE, payload: { error: 'not_logged_in' } });
        return history.replace('/login');
      }
      dispatch({ type: LOGIN_LOGIN_ACTION_SUCCESS, payload: { token: loggedUser.uid } }); // save the user id on the store. Previously it was a token, but since we moved to firestore is just the userID
      dispatch(syncSessions());
      dispatch(fetchAllDefinitions());
      dispatch(homeSetup());
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

export function reducer(
  state: State,
  { type, payload }: { type: string; payload: { error: string } },
) {
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
