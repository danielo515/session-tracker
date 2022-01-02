import useAppSelector from 'hooks/useSelector';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { HOME_SELECT_ROW } from './constants';

/**
 * @param {string} sessionName
 **/
export function selectRow(sessionName) {
  return {
    type: HOME_SELECT_ROW,
    payload: sessionName,
  };
}

export function useSelectRow() {
  const dispatch = useDispatch();
  const boundAction = useCallback(sessionName => dispatch(selectRow(sessionName)), [dispatch]);
  const selectedRow = useAppSelector(state => state.home.selectedRow);
  return { selectRow: boundAction, selectedRow };
}

/** @type {import('./types').Reducer} **/
export function reducer(state, { type, payload }) {
  switch (type) {
    case HOME_SELECT_ROW:
      return {
        ...state,
        selectedRow: payload,
      };

    default:
      return state;
  }
}
