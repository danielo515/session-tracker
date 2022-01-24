import { AppDispatch, RootState } from '@common/configStore';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { stopSession } from './stopSession';
import initialState from './initialState';
import { startSession } from '@common/api';

/**
 * Stops current task and starts a new one with the given name
 */
export const switchTask = createAsyncThunk<
  void,
  { name: string },
  { state: RootState; dispatch: AppDispatch }
>('HOME_SWITCH_TASK', async ({ name }, { dispatch, getState, rejectWithValue }) => {
  const {
    home: { runningSession },
  } = getState();

  runningSession && (await dispatch(stopSession()));
  const response = await startSession({ name });
  if (response.error) {
    return rejectWithValue(response.error);
  }
  // dispatch(addedSession(response.response)); handled by the sync mechanism
});

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(switchTask.pending, (state) => {
    return {
      ...state,
      switchTaskPending: true,
      switchTaskError: null,
    };
  });
  builder.addCase(switchTask.rejected, (state, action) => {
    return {
      ...state,
      switchTaskPending: false,
      switchTaskError: action.error.message || 'Unknown error',
    };
  });
  builder.addCase(switchTask.fulfilled, (state) => {
    return {
      ...state,
      switchTaskPending: false,
      switchTaskError: null,
    };
  });
});
