import {
  HOME_DELETE_SESSION_BEGIN,
  HOME_DELETE_SESSION_SUCCESS,
  HOME_DELETE_SESSION_FAILURE,
  HOME_DELETE_SESSION_DISMISS_ERROR,
} from './constants';
import { Session } from '@types';
import * as api from '@common/api';
import { State } from './initialState';
import { Dispatch } from 'redux-thunk';

type Type =
  | typeof HOME_DELETE_SESSION_BEGIN
  | typeof HOME_DELETE_SESSION_SUCCESS
  | typeof HOME_DELETE_SESSION_FAILURE
  | typeof HOME_DELETE_SESSION_DISMISS_ERROR;

type DeleteDispatch = Dispatch<{ type: Type; payload: {} }>;
/**
 * @return {(dispatch: Dispatch, getState: Function) => void} thunk
 */
export function deleteSession(id: string) {
  return async (dispatch: DeleteDispatch, getState) => {
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

export function reducer(
  state: State,
  action: { type: Type; payload: { session: Session; error?: any } },
) {
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
