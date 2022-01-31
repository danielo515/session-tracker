import { createSelector } from 'reselect';

import { RootState } from '@common/configStore';
import { DefinitionsState } from './redux/types';

function selectSessionDefinitions(state: RootState) {
  return state.sessionDefinition;
}
function selectDefinition_(sessionName: string | undefined, state: DefinitionsState) {
  if (!sessionName) return null;
  return state.byName[sessionName];
}

function selectName(_: unknown, name?: string) {
  return name;
}

export const selectDefinition = createSelector(
  selectName,
  selectSessionDefinitions,
  selectDefinition_,
);
