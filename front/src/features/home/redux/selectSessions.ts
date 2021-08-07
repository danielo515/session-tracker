/** @typedef {import('rootReducer').RootState} State*/
/**
 * @param {State} state
 */
function selectSessions(state: any) {
  return state.home.sessions;
}

export default selectSessions;
