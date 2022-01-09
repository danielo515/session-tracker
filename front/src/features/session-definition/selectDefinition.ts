import { createSelector } from 'reselect';

import { RootState } from '@common/configStore';
import { DefinitionsState } from './redux/types';

function selectSessionDefinitions(state: RootState) {
  return state.sessionDefinition;
}
function selectDefinition(sessionName: string | undefined, state: DefinitionsState) {
  if (!sessionName) return null;
  return state.byName[sessionName];
}

function selectName(
  _: any,
  props: {
    name?: string;
  },
) {
  return props.name;
}

export default createSelector(selectName, selectSessionDefinitions, selectDefinition);
