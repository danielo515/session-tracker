import { createAction, createSlice } from '@reduxjs/toolkit';

export const selectIcon = createAction<string>('selectIcon');
export const resetSelection = createAction('resetSelection');

export const { reducer: ManageIconsReducer } = createSlice({
  name: 'Internal/icons',
  initialState: {
    icons: [] as string[],
    selectedIcon: '',
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(selectIcon, (state, action) => {
      if (!state.icons.includes(action.payload)) {
        state.icons.push(action.payload);
      }
      state.selectedIcon = action.payload;
    });

    builder.addCase(resetSelection, (state) => {
      state.icons = [];
      state.selectedIcon = '';
    });
  },
});
