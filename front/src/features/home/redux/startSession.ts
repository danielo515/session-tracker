// @ts-check

import {
  HOME_START_SESSION_BEGIN,
  HOME_START_SESSION_SUCCESS,
  HOME_START_SESSION_FAILURE,
  HOME_START_SESSION_DISMISS_ERROR,
} from './constants';
import * as api from '../../../common/api';
import { Reducer } from './types';

export function startSession({ name }: { name: string }) {
  return async dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: HOME_START_SESSION_BEGIN,
    });

    const { error, response } = await api.startSession({
      name: name || new Date().toDateString(),
    });
    if (error) {
      dispatch({
        type: HOME_START_SESSION_FAILURE,
        payload: { error },
      });
      return;
    }
    dispatch({
      type: HOME_START_SESSION_SUCCESS,
      payload: response,
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissStartSessionError() {
  return {
    type: HOME_START_SESSION_DISMISS_ERROR,
  };
}

export const reducer: Reducer = function reducer(state, action) {
  switch (action.type) {
    case HOME_START_SESSION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        startSessionPending: true,
        startSessionError: null,
      };

    case HOME_START_SESSION_SUCCESS:
      // The request is success
      return {
        ...state,
        startSessionPending: false,
        startSessionError: null,
        runningSession: action.payload,
      };

    case HOME_START_SESSION_FAILURE:
      // The request is failed
      return {
        ...state,
        startSessionPending: false,
        startSessionError: action.data.error,
      };

    case HOME_START_SESSION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        startSessionError: null,
      };

    default:
      return state;
  }
};
