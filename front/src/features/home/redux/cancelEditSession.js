// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_CANCEL_EDIT_SESSION,
} from './constants';

export function cancelEditSession() {
  return {
    type: HOME_CANCEL_EDIT_SESSION,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CANCEL_EDIT_SESSION:
      return {
        ...state,
        editing: false,
      };

    default:
      return state;
  }
}
