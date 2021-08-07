import {
  STATS_GET_SESSIONS_BEGIN,
  STATS_GET_SESSIONS_SUCCESS,
  STATS_GET_SESSIONS_FAILURE,
  STATS_GET_SESSIONS_DISMISS_ERROR,
} from './constants';

import * as api from '../../../common/api';

/** @typedef {import('../../../common/rootReducer').RootState} RootState*/
/** @typedef {import('redux').Action} Action*/
/** @typedef {import('redux-thunk').ThunkAction<Promise<void>,RootState,void,Action>} GetSessionThunk*/

/**
 * @return {GetSessionThunk}
 */
export function getSessions() {
  return async (dispatch, getState) => {
    dispatch({
      type: STATS_GET_SESSIONS_BEGIN,
    });

    const {
      login: { token },
    } = getState();

    const { error, response } = await api.listSessions({ token });

    if (error) {
      dispatch({
        type: STATS_GET_SESSIONS_FAILURE,
        payload: { error },
      });
      return;
    }
    dispatch({
      type: STATS_GET_SESSIONS_SUCCESS,
      payload: response,
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetSessionsError() {
  return {
    type: STATS_GET_SESSIONS_DISMISS_ERROR,
  };
}

/** @typedef {typeof import('./initialState').default} State*/
/**
 * @param {State} state
 * @param {{ type: string, payload: {all: Session[], error: string}}} action
 **/
export function reducer(state, { type, payload }) {
  switch (type) {
    case STATS_GET_SESSIONS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getSessionsPending: true,
        getSessionsError: null,
      };

    case STATS_GET_SESSIONS_SUCCESS:
      // The request is success
      const { all } = payload;
      return {
        ...state,
        getSessionsPending: false,
        getSessionsError: null,
        sessions: all,
      };

    case STATS_GET_SESSIONS_FAILURE:
      // The request is failed
      return {
        ...state,
        getSessionsPending: false,
        getSessionsError: payload.error,
      };

    case STATS_GET_SESSIONS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getSessionsError: null,
      };

    default:
      return state;
  }
}
