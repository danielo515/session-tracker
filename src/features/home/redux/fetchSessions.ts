import {
  HOME_FETCH_SESSIONS_BEGIN,
  HOME_FETCH_SESSIONS_SUCCESS,
  HOME_PUSHED_SESSION,
  HOME_FETCH_SESSIONS_FAILURE,
  HOME_FETCH_SESSIONS_DISMISS_ERROR,
  HOME_UPDATED_SESSION,
} from './constants';

import * as api from '../../../common/api';
import { addedSession } from './startSession';
import { AppDispatch } from '@common/configStore';
import { State } from './initialState';
import { updateAtIdx } from './updateAtIdx';

/**
 * Fetches all sessions
 */
export function fetchSessions() {
  return async (dispatch) => {
    dispatch({
      type: HOME_FETCH_SESSIONS_BEGIN,
    });

    const result = await api.listSessions();

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
/**
 * Starts the process of syncing sessions
 */
export function syncSessions() {
  return (dispatch: AppDispatch) => {
    api.syncData({
      onRunningUpdate(session) {
        dispatch(addedSession(session));
      },
      onSessionAdded: (value) => {
        value.endDate &&
          dispatch({
            type: HOME_PUSHED_SESSION,
            payload: value,
          });
      },
      onSessionUpdate: (value) => {
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

export function reducer(state: State, action) {
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
            ? updateAtIdx(sessionIdx, state.sessions, (oldSession) => ({
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
