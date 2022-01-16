import { createSessionDefinition } from '@common/api';
import { useAppThunkDispatch } from '@common/configStore';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { SessionDefinition } from '@types';
import useAppSelector from 'hooks/useSelector';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import initialState from './initialState';

const create = createAsyncThunk(
  'SESSION_DEFINITION_CREATE',
  async (definition: SessionDefinition, { rejectWithValue }) => {
    const response = await createSessionDefinition(definition);
    if (response.error) return rejectWithValue(response.error);
    return response.response;
  },
);

export function useCreate() {
  const dispatch = useAppThunkDispatch();

  const { sessionDefinitions, createPending, createError } = useAppSelector(
    (state) => ({
      sessionDefinitions: state.sessionDefinition.byName,
      createPending: state.sessionDefinition.createPending,
      createError: state.sessionDefinition.createError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (sessionDefinition: SessionDefinition) => {
      return dispatch(create(sessionDefinition));
    },
    [dispatch],
  );

  return {
    sessionDefinitions,
    create: boundAction,
    createPending,
    createError,
  };
}

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.pending, (state) => {
    return {
      ...state,
      createPending: true,
      createError: null,
    };
  });
  builder.addCase(create.fulfilled, (state, { payload }) => {
    return {
      ...state,
      createPending: false,
      createError: null,
      byName: {
        ...state.byName,
        [payload.name]: payload,
      },
      all: [...state.all, payload],
    };
  });
  builder.addCase(create.rejected, (state, action) => {
    return {
      ...state,
      createPending: false,
      createError: action.error.message || 'Unknown error',
    };
  });
});
