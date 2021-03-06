import {
  HOME_FETCH_SESSIONS_BEGIN,
  HOME_FETCH_SESSIONS_SUCCESS,
  HOME_START_SESSION_SUCCESS,
  HOME_PUSHED_SESSION,
  HOME_FETCH_SESSIONS_FAILURE,
  HOME_FETCH_SESSIONS_DISMISS_ERROR,
  HOME_UPDATED_SESSION,
} from './constants';

import * as api from '../../../common/api';

export function fetchSessions() {
  return async (dispatch, getState) => {
    dispatch({
      type: HOME_FETCH_SESSIONS_BEGIN,
    });

    const {
      login: { token },
    } = getState();

    const { error, response } = await api.listSessions({ token });

    if (error) {
      dispatch({
        type: HOME_FETCH_SESSIONS_FAILURE,
        payload: { error },
      });
      return;
    }
    dispatch({
      type: HOME_FETCH_SESSIONS_SUCCESS,
      payload: response,
    });
  };
}
/** @typedef {import('../../../types').Session} Session*/
/** @typedef {import('./types').State} State*/
/** @type { import('redux-thunk').ThunkAction<Promise<void>,State,unknown,import('redux').Action>}*/
export function syncSessions() {
  return async (dispatch, getState) => {
    api.syncData({
      onRunningUpdate(session) {
        dispatch({
          type: HOME_START_SESSION_SUCCESS,
          payload: session,
        });
      },
      onSessionAdded: value => {
        value.endDate &&
          dispatch({
            type: HOME_PUSHED_SESSION,
            payload: value,
          });
      },
      onSessionUpdate: value => {
        dispatch({
          type: HOME_UPDATED_SESSION,
          payload: value,
        });
      },
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchSessionsError() {
  return {
    type: HOME_FETCH_SESSIONS_DISMISS_ERROR,
  };
}

/**
 * Updates a value in an array at the specified index
 * @template T
 * @param {number} idx
 * @param {T[]} arr
 * @param {T|((x:T) => T)} newVal
 */
function updateAtIdx(idx, arr, newVal) {
  const oldVAl = arr[idx];
  return [
    ...arr.slice(0, idx),
    typeof newVal === 'function' ? newVal(oldVAl) : newVal,
    ...arr.slice(idx + 1),
  ];
}
/** @typedef {{type: HOME_FETCH_SESSIONS_SUCCESS, payload: Session[]}} Success*/
/** @typedef {{type: HOME_PUSHED_SESSION, payload: Session}} Pushed*/
/** @typedef {{type: HOME_UPDATED_SESSION, payload: Session}} Updated*/
/** @typedef {{type: HOME_FETCH_SESSIONS_BEGIN }} Begin*/
/** @typedef {{type: HOME_FETCH_SESSIONS_FAILURE, payload: {error: any} }} Fail*/
/** @typedef {{type: HOME_FETCH_SESSIONS_DISMISS_ERROR}} Dismiss*/
/** @type {import('react').Reducer<State, Success | Pushed | Begin | Fail | Dismiss | Updated>}*/
export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_SESSIONS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchSessionsPending: true,
        fetchSessionsError: null,
      };

    case HOME_FETCH_SESSIONS_SUCCESS: {
      const sessions = action.payload;
      // The request is success
      return {
        ...state,
        fetchSessionsPending: false,
        fetchSessionsError: null,
        runningSession: sessions.find(({ endDate }) => !endDate),
        sessions: sessions.filter(({ endDate }) => endDate), // skip runninng sessions
      };
    }

    case HOME_PUSHED_SESSION: {
      const sessionIdx = state.sessions.findIndex(({ id }) => id === action.payload.id);
      return {
        ...state,
        sessions:
          sessionIdx >= 0
            ? updateAtIdx(sessionIdx, state.sessions, action.payload)
            : [action.payload, ...state.sessions],
      };
    }
    case HOME_UPDATED_SESSION: {
      const sessionIdx = state.sessions.findIndex(({ id }) => id === action.payload.id);
      return {
        ...state,
        sessions:
          sessionIdx >= 0
            ? updateAtIdx(sessionIdx, state.sessions, oldSession => ({
                ...oldSession,
                ...action.payload,
              }))
            : state.sessions,
      };
    }

    case HOME_FETCH_SESSIONS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchSessionsPending: false,
        fetchSessionsError: action.payload.error,
      };

    case HOME_FETCH_SESSIONS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchSessionsError: null,
      };

    default:
      return state;
  }
}
