import { bindActionCreators, createAction, createReducer } from '@reduxjs/toolkit';
import initialState from './initialState';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'rootReducer';
const empty = { payload: '' };
const noop = () => empty;
// This is to prevent from click events ending as part of the action payload
const nextDay = createAction('stats/next-day', noop);
const previousDay = createAction('stats/previous-day', noop);
/** @typedef {import('rootReducer').RootState} RootState */

export function useNavigateDays() {
  const dispatch = useDispatch();

  const daysAgo = useSelector(
    (
      /**
       * @param {RootState} state
       */
      state: RootState,
    ) => state.stats.daysAgo,
  );

  return {
    daysAgo,
    ...bindActionCreators({ nextDay, previousDay }, dispatch),
  };
}

export default createReducer(initialState, builder => {
  builder.addCase(nextDay, state => {
    state.daysAgo++;
  });
  builder.addCase(previousDay, state => {
    state.daysAgo = Math.max(0, state.daysAgo - 1);
  });
});
