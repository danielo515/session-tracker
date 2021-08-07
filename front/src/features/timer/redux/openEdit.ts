import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  TIMER_OPEN_EDIT,
} from './constants';

export function openEdit() {
  return {
    type: TIMER_OPEN_EDIT,
  };
}

export function useOpenEdit() {
  const dispatch = useDispatch();
  // @ts-expect-error ts-migrate(2556) FIXME: Expected 0 arguments, but got 1 or more.
  const boundAction = useCallback((...params) => dispatch(openEdit(...params)), [dispatch]);
  return { openEdit: boundAction };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case TIMER_OPEN_EDIT:
      return {
        ...state,
      };

    default:
      return state;
  }
}
