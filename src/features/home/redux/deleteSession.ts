import initialState from './initialState';
import { createAsyncReducer } from './createAsyncReducer';
import { deleteSession as deleteAPI } from '@common/api';

export const { action: deleteSession, reducer } = createAsyncReducer({
  actionName: 'HOME_DELETE_SESSION',
  prefix: 'deleteSession',
  initialState: initialState,
  payloadCreator: (id: string) => deleteAPI({ id }),
  onFulfilled: (state, action) => {
    return {
      ...state,
      deleteSessionError: null,
      deleteSessionPending: false,
      sessions: state.sessions.filter(({ id }) => id !== action.meta.arg), // It will be better to use finIndex and then slice the array
    };
  },
});
