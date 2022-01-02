import { createSelector } from 'reselect';

function selectSessionDefinitions(/** @type {import('rootReducer').RootState} */ state) {
  return state.sessionDefinition;
}
/**
 * @param {string|undefined}  sessionName
 * @param {import('./redux/types').DefinitionsState} state
 */
function selectDefinition(sessionName, state) {
  if (!sessionName) return null;
  return state.byName[sessionName];
}

/**
 * @param {any} _
 * @param {Object} props
 * @param {string} [ props.name ]
 * */
function selectName(_, props) {
  return props.name;
}

export default createSelector(selectName, selectSessionDefinitions, selectDefinition);
