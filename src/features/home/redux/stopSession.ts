import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import initialState from './initialState';
import { stopSession as stopSessionApi } from '@common/api';

export const stopSession = createAsyncThunk('HOME_STOP_SESSION', async (_, { rejectWithValue }) => {
  const { error, response } = await stopSessionApi(undefined);
  if (error) {
    return rejectWithValue(error);
  }
  return response;
});

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(stopSession.pending, (state) => {
    return { ...state, stopSessionPending: true, stopSessionError: null };
  });
  builder.addCase(stopSession.fulfilled, (state) => {
    return { ...state, stopSessionPending: false, stopSessionError: null, runningSession: null };
  });
  builder.addCase(stopSession.rejected, (state, action) => {
    return {
      ...state,
      stopSessionPending: false,
      stopSessionError: action.error.message || null,
      runningSession: null,
    };
  });
});
