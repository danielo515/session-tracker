/** @typedef {import('rootReducer').RootState} State*/
/**
 * @param {State} state
 */
const selectSessions = state => state.home.sessions;

export default selectSessions;
