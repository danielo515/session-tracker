/** @typedef {import('rootReducer').RootState} State*/
/**
 * @param {State} state
 */
const selectRunningSession = (state: State) => state.home.runningSession;

export default selectRunningSession;
