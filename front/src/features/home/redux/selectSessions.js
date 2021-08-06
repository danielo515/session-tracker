/** @typedef {import('rootReducer').RootState} State*/
/**
 * @param {State} state
 */
function selectSessions(state) {
  return state.home.sessions;
}

export default selectSessions;
