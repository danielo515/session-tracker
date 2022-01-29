import { createSelector } from '@reduxjs/toolkit';
import selectSessions from 'features/home/redux/selectSessions';
import { selectRelativeMonthsSessions } from 'features/stats/redux/selectRelativeMonthsSessions';

/**
 * Given a name, returns the sessions having that name.
 */
const selectSessionsByName = createSelector(
  selectSessions,
  (_: unknown, props: { name: string }) => props.name,
  (sessions, name) => sessions.filter((s) => s.name === name),
);

/**
 * Given a name selects the sessions of the current month.
 */
export const selectMonthByName = createSelector(selectSessionsByName, selectRelativeMonthsSessions);
