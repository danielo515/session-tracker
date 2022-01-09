import {
  HOME_SWITCH_TASK_BEGIN,
  HOME_SWITCH_TASK_SUCCESS,
  HOME_SWITCH_TASK_FAILURE,
  HOME_SWITCH_TASK_DISMISS_ERROR,
  HOME_STOP_SESSION_SUCCESS,
} from './constants';
import * as api from '../../../common/api';

import { RootState } from '@common/configStore';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { State } from './types';
import { addedSession } from './startSession';

/**
 * @typedef {import('redux').Action<HOME_SWITCH_TASK_BEGIN>} SwitchTask
 * @typedef {{type: HOME_SWITCH_TASK_FAILURE, payload: {error: any}}} SwitchError
 * @typedef {import('redux').Action<HOME_SWITCH_TASK_SUCCESS>} SwitchSUCCESS
 * @typedef {import('redux').Action<HOME_START_SESSION_SUCCESS>} START_SESSION_SUCCESS
 * @typedef {import('redux').Action<HOME_SWITCH_TASK_DISMISS_ERROR>} Dismiss
 * @typedef {SwitchTask | SwitchError | SwitchSUCCESS | START_SESSION_SUCCESS | Dismiss } Actions
 *
 **/

type Actions =
  | Action<typeof HOME_SWITCH_TASK_BEGIN>
  | Action<typeof HOME_SWITCH_TASK_SUCCESS>
  | Action<typeof HOME_SWITCH_TASK_DISMISS_ERROR>
  | Action<typeof HOME_STOP_SESSION_SUCCESS>;

const stopSession = async ({
  dispatch,
  id,
  name,
}: {
  id: string;
  name: string;
  dispatch: Function;
}) => {
  const { error, response } = await api.stopSession({ id, name });

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
};

/**
 * Stops current task and starts a new one with the given name
 */
export function switchTask({
  name,
}: {
  name: string;
}): ThunkAction<void, RootState, unknown, Actions> {
  return async (dispatch, getState) => {
    dispatch({
      type: HOME_SWITCH_TASK_BEGIN,
    });

    const {
      home: { runningSession },
    } = getState();

    runningSession && (await stopSession({ dispatch, ...runningSession }));

    const response = await api.startSession({ name });

    if (response.error) {
      dispatch({
        type: HOME_SWITCH_TASK_FAILURE,
        payload: { error: response.error },
      });
      return;
    }

    dispatch(addedSession(response.response));
    dispatch({
      type: HOME_SWITCH_TASK_SUCCESS,
      payload: response.response,
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

export function reducer(state: State, action: Actions) {
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
