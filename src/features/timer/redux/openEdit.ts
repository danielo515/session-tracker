import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { TIMER_OPEN_EDIT } from './constants';

export function openEdit() {
  return {
    type: TIMER_OPEN_EDIT,
  };
}

export function useOpenEdit() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => dispatch(openEdit()), [dispatch]);
  return { openEdit: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMER_OPEN_EDIT:
      return {
        ...state,
      };

    default:
      return state;
  }
}
