import { updateDefinition } from '@common/api';
import { SessionDefinitionFromDb } from '@types';
import { createAsyncReducer } from 'features/home/redux/createAsyncReducer';
import { updateAtIdx } from 'features/home/redux/updateAtIdx';
import initialState from './initialState';

export const { reducer: updateSessionDefinitionReducer, action: updateSessionDefinition } =
  createAsyncReducer({
    prefix: 'updateSessionDefinition',
    initialState,
    payloadCreator: async (definition: SessionDefinitionFromDb) => {
      const response = await updateDefinition(definition);
      return response.response;
    },
    actionName: 'SESSION-DEFINITION/UPDATE',
    onFulfilled: (state, { payload }) => {
      state.updateSessionDefinitionError = null;
      state.updateSessionDefinitionPending = false;
      state.byName[payload.name] = payload;
      const index = state.all.findIndex((d) => d.id === payload.id);
      state.all = updateAtIdx(index, state.all, payload);
      return state;
    },
  });
