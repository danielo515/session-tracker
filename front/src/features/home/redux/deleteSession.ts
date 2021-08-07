import {
  HOME_DELETE_SESSION_BEGIN,
  HOME_DELETE_SESSION_SUCCESS,
  HOME_DELETE_SESSION_FAILURE,
  HOME_DELETE_SESSION_DISMISS_ERROR,
} from './constants';

import * as api from '../../../common/api';

/**@typedef { HOME_DELETE_SESSION_BEGIN | HOME_DELETE_SESSION_SUCCESS | HOME_DELETE_SESSION_FAILURE | HOME_DELETE_SESSION_DISMISS_ERROR} Type */

/**
 *
 * @template {import('redux').Dispatch<{type: Type, payload: {}}>} Dispatch
 * @export
 * @param {string} id
 * @return {(dispatch: Dispatch, getState: Function) => void} thunk
 */
export function deleteSession(id) {
  return async (dispatch, getState) => {
    dispatch({
      type: HOME_DELETE_SESSION_BEGIN,
    });

    const {
      login: { token },
    } = getState();

    const { error, response } = await api.deleteSession({ token, id });

    if (error) {
      dispatch({
        type: HOME_DELETE_SESSION_FAILURE,
        payload: { error },
      });
      return;
    }
    dispatch({
      type: HOME_DELETE_SESSION_SUCCESS,
      payload: { session: response },
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissDeleteSessionError() {
  return {
    type: HOME_DELETE_SESSION_DISMISS_ERROR,
  };
}

/**
 *
 *
 * @template {typeof import('./initialState').default} State
 * @template {import('../../../types').Session} Session
 * @export
 * @param {State} state
 * @param {{type: Type, payload: { session: Session, error?: any}}} action
 * @return {State}
 */
export function reducer(state, action) {
  switch (action.type) {
    case HOME_DELETE_SESSION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteSessionPending: true,
        deleteSessionError: null,
      };

    case HOME_DELETE_SESSION_SUCCESS:
      // The request is success
      return {
        ...state,
        editing: false,
        deleteSessionPending: false,
        deleteSessionError: null,
        sessions: state.sessions.filter(({ id }) => id !== action.payload.session.id), // It will be better to use finIndex and then slice the array
      };

    case HOME_DELETE_SESSION_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteSessionPending: false,
        deleteSessionError: action.payload.error,
      };

    case HOME_DELETE_SESSION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteSessionError: null,
      };

    default:
      return state;
  }
}
