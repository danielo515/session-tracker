import {
  HOME_FETCH_SESSIONS_BEGIN,
  HOME_FETCH_SESSIONS_SUCCESS,
  HOME_START_SESSION_SUCCESS,
  HOME_PUSHED_SESSION,
  HOME_FETCH_SESSIONS_FAILURE,
  HOME_FETCH_SESSIONS_DISMISS_ERROR,
  HOME_UPDATED_SESSION,
} from './constants';
/** @typedef {{type: HOME_FETCH_SESSIONS_SUCCESS, payload: {sessions: Session[], current: void | import('../../../types').RunningSession } }} Success*/
/** @typedef {{type: HOME_PUSHED_SESSION, payload: Session}} Pushed*/
/** @typedef {{type: HOME_UPDATED_SESSION, payload: Session}} Updated*/
/** @typedef {{type: HOME_FETCH_SESSIONS_BEGIN }} Begin*/
/** @typedef {{type: HOME_FETCH_SESSIONS_FAILURE, payload: {error: any} }} Fail*/
/** @typedef {{type: HOME_FETCH_SESSIONS_DISMISS_ERROR}} Dismiss*/
/** @typedef {import('redux').Action<HOME_START_SESSION_SUCCESS>} ExternalAction*/
/** @typedef { Success | Pushed | Begin | Fail | Dismiss | Updated} Actions*/
/** @typedef {import('rootReducer').RootState} RootState*/

import * as api from '../../../common/api';
import { updateAtIdx } from './updateAtIdx';

/**
 * Fetches all sessions
 * @return {import('redux-thunk').ThunkAction<void,RootState,unknown,Actions>}
 */
export function fetchSessions() {
  return async (dispatch, getState) => {
    dispatch({
      type: HOME_FETCH_SESSIONS_BEGIN,
    });

    const {
      login: { token },
    } = getState();

    const result = await api.listSessions({ token });

    if (result.error) {
      dispatch({
        type: HOME_FETCH_SESSIONS_FAILURE,
        payload: { error: result.error },
      });
      return;
    }
    const { response } = result;
    dispatch({
      type: HOME_FETCH_SESSIONS_SUCCESS,
      payload: { sessions: response.all, current: response.current },
    });
  };
}
/** @typedef {import('../../../types').Session} Session*/
/** @typedef {import('./types').State} State*/

/**
 * Starts the process of syncing sessions
 * @return {import('redux-thunk').ThunkAction<void,void,unknown,Actions|ExternalAction>}
 */
export function syncSessions() {
  return dispatch => {
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

/** @type {import('react').Reducer<State,Actions>} */
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
      const { sessions, current } = action.payload;
      // The request is success
      return {
        ...state,
        fetchSessionsPending: false,
        fetchSessionsError: null,
        runningSession: current,
        sessions: sessions, // skip runninng sessions
        sessionsById: sessions.reduce((
          /** @type {{[id:string]: Session}} */
          acc,
          session,
        ) => {
          acc[session.id] = session;
          return acc;
        }, {}),
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
