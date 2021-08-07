/** @typedef {import('rootReducer').RootState} State*/
/**
 * @param {State} state
 */
const selectRunningSession = (state: any) => state.home.runningSession;

export default selectRunningSession;
