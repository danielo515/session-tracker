import * as api from '../../../common/api';
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import initialState from './initialState';
import { RunningSession } from '@types';

export const startSession = createAsyncThunk(
  'HOME_START_SESSION',
  async ({ name }: { name?: string }, { rejectWithValue, dispatch }) => {
    const { error, response } = await api.startSession({
      name: name || new Date().toDateString(),
    });
    if (error) {
      return rejectWithValue(error);
    }
    if (!response) throw new Error('No response and no error!');
    return dispatch(addedSession(response)).payload;
  },
);

export const addedSession = createAction<RunningSession | null>('ADDED_SESSION');

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(startSession.pending, (state) => ({
    ...state,
    startSessionPending: true,
    startSessionError: null,
  }));
  builder.addCase(addedSession, (state, action) => ({
    ...state,
    startSessionPending: false,
    startSessionError: null,
    runningSession: action.payload,
  }));
  builder.addCase(startSession.rejected, (state, action) => ({
    ...state,
    startSessionPending: false,
    startSessionError: action.error.message || 'Unknown error',
  }));
});
