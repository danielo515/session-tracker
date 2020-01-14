import initialState from './initialState';
import { reducer as startSessionReducer } from './startSession';
import { reducer as stopSessionReducer } from './stopSession';
import { reducer as fetchSessionsReducer } from './fetchSessions';

const reducers = [
  startSessionReducer,
  stopSessionReducer,
  fetchSessionsReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
