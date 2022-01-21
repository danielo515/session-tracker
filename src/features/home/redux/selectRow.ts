import useAppSelector from 'hooks/useSelector';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { HOME_SELECT_ROW } from './constants';
import { State } from './initialState';

export function selectRow(sessionName: string) {
  return {
    type: HOME_SELECT_ROW,
    payload: sessionName,
  };
}

export function useSelectRow() {
  const dispatch = useDispatch();
  const boundAction = useCallback((sessionName) => dispatch(selectRow(sessionName)), [dispatch]);
  const selectedRow = useAppSelector((state) => state.home.selectedRow);
  return { selectRow: boundAction, selectedRow };
}

// @ts-expect-error TODO migrate to toolkit
export function reducer(state: State, { type, payload }) {
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
