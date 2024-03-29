import {
  HOME_UPDATE_SESSION_BEGIN,
  HOME_UPDATE_SESSION_SUCCESS,
  HOME_UPDATE_SESSION_FAILURE,
  HOME_UPDATE_SESSION_DISMISS_ERROR,
} from './constants';

import { updateSession as updateSessionApi } from '@common/api';
import { Session } from '@types';
import initialState from './initialState';
import { AppDispatch } from '@common/configStore';

export function updateSession(session: Session) {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: HOME_UPDATE_SESSION_BEGIN,
    });

    const { error, response } = await updateSessionApi(session);

    if (error) {
      dispatch({
        type: HOME_UPDATE_SESSION_FAILURE,
        payload: { error },
      });
      return;
    }
    dispatch({
      type: HOME_UPDATE_SESSION_SUCCESS,
      payload: { session: response },
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissUpdateSessionError() {
  return {
    type: HOME_UPDATE_SESSION_DISMISS_ERROR,
  };
}

//@ts-expect-error TODO migrate to toolkit
export function reducer(state: typeof initialState, action) {
  switch (action.type) {
    case HOME_UPDATE_SESSION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateSessionPending: true,
        updateSessionError: null,
      };

    case HOME_UPDATE_SESSION_SUCCESS: {
      const { session } = action.payload;
      const updatedIdx = state.sessions.findIndex(({ id }) => id === session.id);
      const sessions = state.sessions
        .slice(0, updatedIdx)
        .concat([session])
        .concat(state.sessions.slice(updatedIdx + 1));
      return {
        ...state,
        sessions,
        editing: false,
        updateSessionPending: false,
        updateSessionError: null,
      };
    }

    case HOME_UPDATE_SESSION_FAILURE:
      // The request is failed
      return {
        ...state,
        editing: false,
        updateSessionPending: false,
        updateSessionError: action.payload.error,
      };

    case HOME_UPDATE_SESSION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateSessionError: null,
      };

    default:
      return state;
  }
}
