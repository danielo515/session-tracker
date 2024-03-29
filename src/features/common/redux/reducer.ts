// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:

import initialState, { State } from './initialState';
import { reducer as setupAppReducer } from './setupApp';
import { reducer as editRunningSessionReducer } from './editRunningSession';

const reducers = [setupAppReducer, editRunningSessionReducer];

export default function reducer(state = initialState, action: any) {
  let newState: State;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
