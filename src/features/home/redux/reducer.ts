import initialState, { State } from './initialState';
import { reducer as startSessionReducer } from './startSession';
import { reducer as stopSessionReducer } from './stopSession';
import { reducer as fetchSessionsReducer } from './fetchSessions';
import { reducer as deleteSessionReducer } from './deleteSession';
import { reducer as switchTaskReducer } from './switchTask';
import { reducer as editSessionReducer } from './editSession';
import { reducer as updateSessionReducer } from './updateSession';
import { reducer as cancelEditSessionReducer } from './cancelEditSession';
import { reducer as selectRowReducer } from './selectRow';

const reducers = [
  startSessionReducer,
  stopSessionReducer,
  fetchSessionsReducer,
  deleteSessionReducer,
  switchTaskReducer,
  editSessionReducer,
  updateSessionReducer,
  cancelEditSessionReducer,
  selectRowReducer,
] as const;

export default function reducer(state = initialState, action: any): State {
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
