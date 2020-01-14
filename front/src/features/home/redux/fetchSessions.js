import {
  HOME_FETCH_SESSIONS_BEGIN,
  HOME_FETCH_SESSIONS_SUCCESS,
  HOME_FETCH_SESSIONS_FAILURE,
  HOME_FETCH_SESSIONS_DISMISS_ERROR,
} from './constants';

import * as api from '../../../common/api'


export function fetchSessions(args = {}) {
  return async (dispatch, getState) => {
    dispatch({
      type: HOME_FETCH_SESSIONS_BEGIN,
    });

    const { login: { token } } = getState();

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

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchSessionsError() {
  return {
    type: HOME_FETCH_SESSIONS_DISMISS_ERROR,
  };
}

export function reducer(state, { type, payload }) {
  switch (type) {
    case HOME_FETCH_SESSIONS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchSessionsPending: true,
        fetchSessionsError: null,
      };

    case HOME_FETCH_SESSIONS_SUCCESS: {
      const sessions = payload.sessions.reverse() // they are sorted asc by default
      // The request is success
      return {
        ...state,
        fetchSessionsPending: false,
        fetchSessionsError: null,
        runningSession: sessions.find(({ endDate }) => !endDate),
        sessions: sessions.filter(({ endDate }) => endDate) // skip runninng sessions
      };
    }

    case HOME_FETCH_SESSIONS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchSessionsPending: false,
        fetchSessionsError: payload.error,
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