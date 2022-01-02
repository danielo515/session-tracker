import { bindActionCreators, createAction, createReducer } from '@reduxjs/toolkit';
import initialState from './initialState';
import { useDispatch, useSelector } from 'react-redux';

const empty = { payload: '' };
const noop = () => empty;
// This is to prevent from click events ending as part of the action payload
const nextWeek = createAction('stats/next-week', noop);
const previousWeek = createAction('stats/previous-week', noop);
/** @typedef {import('rootReducer').RootState} RootState */

export function useNavigateWeeks() {
  const dispatch = useDispatch();

  const weeksAgo = useSelector(
    /**
     * @param {RootState} state
     */
    state => state.stats.weeksAgo,
  );

  return {
    weeksAgo,
    ...bindActionCreators({ nextWeek, previousWeek }, dispatch),
  };
}

export default createReducer(initialState, builder => {
  builder.addCase(nextWeek, state => {
    state.weeksAgo++;
  });
  builder.addCase(previousWeek, state => {
    state.weeksAgo = Math.max(0, state.weeksAgo - 1);
  });
});
