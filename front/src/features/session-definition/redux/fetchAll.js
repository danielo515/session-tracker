import useAppSelector from 'hooks/useSelector';
import { bindActionCreators, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { useDispatch, shallowEqual } from 'react-redux';
import { SESSION_DEFINITION_FETCH_ALL_DISMISS_ERROR } from './constants';
import { listDefinitions } from '@common/api';
import initialState from './initialState';

export const fetchAllDefinitions = createAsyncThunk(
  'SESSION-DEFINITION/FETCH-ALL',
  async (arg, thunkApi) => {
    const response = await listDefinitions();
    if (response.error) thunkApi.rejectWithValue(response.error);
    return response.response;
  },
);

export function dismissFetchAllError() {
  return {
    type: SESSION_DEFINITION_FETCH_ALL_DISMISS_ERROR,
  };
}

export function useFetchAll() {
  const dispatch = useDispatch();

  const { definitions } = useAppSelector(
    state => ({
      definitions: state.sessionDefinition.all,
    }),
    shallowEqual,
  );

  return {
    ...bindActionCreators({ fetchAllDefinitions, dismissFetchAllError }, dispatch),
    definitions,
  };
}

export const reducer = createReducer(initialState, builder => {
  builder.addCase(fetchAllDefinitions.fulfilled, (state, action) => {
    state.byName =
      action.payload?.reduce((acc, definition) => {
        acc[definition.name] = definition;
        return acc;
      }, {}) || state.byName;
    state.all = action.payload;
  });
});
