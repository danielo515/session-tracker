import { HOME_EDIT_SESSION } from './constants';
import { State } from './initialState';

export function editSession(id: string) {
  return {
    type: HOME_EDIT_SESSION,
    payload: { id },
  };
}

export function reducer(
  state: State,
  action: { type: typeof HOME_EDIT_SESSION; payload: { id: string } },
) {
  switch (action.type) {
    case HOME_EDIT_SESSION:
      return {
        ...state,
        editing: true,
        sessionBeingEdited: action.payload.id,
      };

    default:
      return state;
  }
}
