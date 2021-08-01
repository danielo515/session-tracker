/** @typedef {import('rootReducer').RootState} State*/
/**
 * @param {State} state
 */
const selectRunningSession = state => state.home.runningSession;

export default selectRunningSession;
