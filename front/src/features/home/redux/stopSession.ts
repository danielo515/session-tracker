// @ts-check
import {
  HOME_STOP_SESSION_BEGIN,
  HOME_STOP_SESSION_SUCCESS,
  HOME_STOP_SESSION_FAILURE,
  HOME_STOP_SESSION_DISMISS_ERROR,
} from './constants';
import * as api from '../../../common/api';
import { Action } from '@reduxjs/toolkit';
import { State } from './initialState';
import { Session } from '@types';

/**
 * @template T
 * @template K
 * @typedef {{ type: T, payload: K}} A*/
/**
 * @typedef {A<HOME_STOP_SESSION_BEGIN, void>
 * |A<HOME_STOP_SESSION_DISMISS_ERROR, void>
 * |A<HOME_STOP_SESSION_SUCCESS, import('@types').Session>
 * |A<HOME_STOP_SESSION_FAILURE, {error: any}>} Actions
 * */

type Actions =
  | Action<typeof HOME_STOP_SESSION_BEGIN>
  | Action<typeof HOME_STOP_SESSION_DISMISS_ERROR>
  | { type: typeof HOME_STOP_SESSION_SUCCESS; payload: { session: Session } }
  | { type: typeof HOME_STOP_SESSION_FAILURE; payload: { error: any } };

/**
 * @param {{id: string, name: string}} args
 * @returns { import('redux-thunk').ThunkAction<
 * Promise<void>, import('rootReducer').RootState,unknown,Actions> }
 **/
export function stopSession() {
  return async dispatch => {
    dispatch({
      type: HOME_STOP_SESSION_BEGIN,
      payload: undefined,
    });

    const { error, response } = await api.stopSession();
    if (error) {
      dispatch({
        type: HOME_STOP_SESSION_FAILURE,
        payload: { error },
      });
      return;
    }
    dispatch({
      type: HOME_STOP_SESSION_SUCCESS,
      payload: response,
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissStopSessionError() {
  return {
    type: HOME_STOP_SESSION_DISMISS_ERROR,
  };
}

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case HOME_STOP_SESSION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        stopSessionPending: true,
        stopSessionError: null,
      };

    case HOME_STOP_SESSION_SUCCESS:
      // The request is success
      return {
        ...state,
        stopSessionPending: false,
        stopSessionError: null,
        runningSession: null,
        // sessions: [payload, ...state.sessions], // this is now handled on the sync mechanism
      };

    case HOME_STOP_SESSION_FAILURE:
      // The request is failed
      return {
        ...state,
        stopSessionPending: false,
        stopSessionError: action.payload.error,
      };

    case HOME_STOP_SESSION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        stopSessionError: null,
      };

    default:
      return state;
  }
}
