import selectRunningSession from 'features/home/redux/selectRunningSession';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { updateRunningSession } from '@common/api';
import {
  COMMON_EDIT_RUNNING_SESSION_BEGIN,
  COMMON_EDIT_RUNNING_SESSION_SUCCESS,
  COMMON_EDIT_RUNNING_SESSION_FAILURE,
  COMMON_EDIT_RUNNING_SESSION_DISMISS_ERROR,
} from './constants';
import useAppSelector from 'hooks/useSelector';
import { AppDispatch, useAppDispatch } from '@common/configStore';
import { State } from './initialState';

export function editRunningSession({ name, startDate }: { name: string; startDate: Date }) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: COMMON_EDIT_RUNNING_SESSION_BEGIN,
    });

    return updateRunningSession({ name, startDate })
      .then(({ response: runningSession }) => {
        dispatch({
          type: COMMON_EDIT_RUNNING_SESSION_SUCCESS,
          data: { runningSession },
        });
        return runningSession;
      })
      .catch((err) => {
        dispatch({
          type: COMMON_EDIT_RUNNING_SESSION_FAILURE,
          data: { error: err },
        });
      });
  };
}

export function dismissEditRunningSessionError() {
  return {
    type: COMMON_EDIT_RUNNING_SESSION_DISMISS_ERROR,
  };
}

export function useEditRunningSession() {
  const dispatch = useAppDispatch();

  const { runningSession, editRunningSessionPending, editRunningSessionError } = useAppSelector(
    (state) => ({
      runningSession: selectRunningSession(state),
      editRunningSessionPending: state.common.editRunningSessionPending,
      editRunningSessionError: state.common.editRunningSessionError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (session) => {
      return dispatch(editRunningSession(session));
    },
    [dispatch],
  );

  const boundDismissError = useCallback(() => {
    return dispatch(dismissEditRunningSessionError());
  }, [dispatch]);

  return {
    runningSession,
    editRunningSession: boundAction,
    editRunningSessionPending,
    editRunningSessionError,
    dismissEditRunningSessionError: boundDismissError,
  };
}

// @ts-expect-error TODO migrate to toolkit
export function reducer(state: State, action) {
  switch (action.type) {
    case COMMON_EDIT_RUNNING_SESSION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        editRunningSessionPending: true,
        editRunningSessionError: null,
      };

    case COMMON_EDIT_RUNNING_SESSION_SUCCESS:
      // The request is success
      return {
        ...state,
        editRunningSessionPending: false,
        editRunningSessionError: null,
      };

    case COMMON_EDIT_RUNNING_SESSION_FAILURE:
      // The request is failed
      return {
        ...state,
        editRunningSessionPending: false,
        editRunningSessionError: action.data.error,
      };

    case COMMON_EDIT_RUNNING_SESSION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        editRunningSessionError: null,
      };

    default:
      return state;
  }
}
