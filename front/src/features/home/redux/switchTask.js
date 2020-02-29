import {
  HOME_SWITCH_TASK_BEGIN,
  HOME_SWITCH_TASK_SUCCESS,
  HOME_SWITCH_TASK_FAILURE,
  HOME_SWITCH_TASK_DISMISS_ERROR,
  HOME_STOP_SESSION_SUCCESS,
  HOME_START_SESSION_SUCCESS,
} from './constants';

import * as api from '../../../common/api'

const stopSession = async ({ dispatch, id, name, token }) => {
  const { error, response } = await api.stopSession({ token, id, name });

  if (error) {
    dispatch({
      type: HOME_SWITCH_TASK_FAILURE,
      payload: { error },
    });
    return;
  }

  dispatch({
    type: HOME_STOP_SESSION_SUCCESS,
    payload: response,
  });
}

export function switchTask({name}) {
  return async (dispatch, getState) => {
    dispatch({
      type: HOME_SWITCH_TASK_BEGIN,
    });

    const { login: { token }, home: { runningSession } } = getState();

    runningSession && await stopSession({ dispatch, token, ...runningSession })

    const { error: startError, response: startResp } = await api.startSession({ token, name });

    if (startError) {
      dispatch({
        type: HOME_SWITCH_TASK_FAILURE,
        payload: { error: startError },
      });
      return;
    }

    dispatch({
      type: HOME_START_SESSION_SUCCESS,
      payload: startResp,
    });
    dispatch({
      type: HOME_SWITCH_TASK_SUCCESS,
      payload: startResp,
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSwitchTaskError() {
  return {
    type: HOME_SWITCH_TASK_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SWITCH_TASK_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        switchTaskPending: true,
        switchTaskError: null,
      };

    case HOME_SWITCH_TASK_SUCCESS:
      // The request is success
      return {
        ...state,
        switchTaskPending: false,
        switchTaskError: null,
      };

    case HOME_SWITCH_TASK_FAILURE:
      // The request is failed
      return {
        ...state,
        switchTaskPending: false,
        switchTaskError: action.payload.error,
      };

    case HOME_SWITCH_TASK_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        switchTaskError: null,
      };

    default:
      return state;
  }
}
