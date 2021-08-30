import { createSelector } from 'reselect';

function selectSessionDefinitions(/** @type {import('rootReducer').RootState} */ state) {
  return state.sessionDefinition;
}
/**
 * @param {string} sessionName
 * @param {import('./redux/types').DefinitionsState} state
 */
function selectDefinition(sessionName, state) {
  return state.byName[sessionName];
}

export default createSelector((_, props) => props.name, selectSessionDefinitions, selectDefinition);
