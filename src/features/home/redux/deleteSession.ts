import * as api from '@common/api';
import initialState from './initialState';
import { createAsyncReducer } from './createAsyncReducer';

export const { action: deleteSession, reducer } = createAsyncReducer({
  actionName: 'HOME_DELETE_SESSION',
  prefix: 'deleteSession',
  initialState: initialState,
  payloadCreator: (id: string) => api.deleteSession({ id }),
  onFulfilled: (state, action) => {
    return {
      ...state,
      deleteSessionError: null,
      deleteSessionPending: false,
      sessions: state.sessions.filter(({ id }) => id !== action.meta.arg), // It will be better to use finIndex and then slice the array
    };
  },
});
