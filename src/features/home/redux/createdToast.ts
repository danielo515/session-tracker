import { createSlice } from '@reduxjs/toolkit';
import { stopSession } from './stopSession';

export const {
  reducer: createdToastReducer,
  actions: { dismissToast },
} = createSlice({
  name: 'home-toast',
  initialState: {
    recentSessionId: '',
  },
  reducers: {
    dismissToast(state) {
      state.recentSessionId = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(stopSession.fulfilled, (state, action) => {
      state.recentSessionId = action.payload.id;
    });
  },
});
