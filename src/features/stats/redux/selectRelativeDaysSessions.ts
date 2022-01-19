/** @typedef {import("@types").Session} Session*/

import { SessionWithAllDates } from '@types';
import selectAllSessions from 'features/home/redux/selectAllSessions';
import { createSelector } from 'reselect';
import subDays from 'date-fns/subDays';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import isWithinInterval from 'date-fns/isWithinInterval';

/**
 * Given a number of days ago selects the sessions of that day.
 */
function selectRelativeDaysSessions(
  sessions: SessionWithAllDates[],
  daysAgo = 0,
): SessionWithAllDates[] {
  const today = endOfDay(new Date());
  const dayRef = subDays(today, daysAgo);
  const interval = { start: startOfDay(dayRef), end: endOfDay(dayRef) };
  return sessions.filter(({ startDate }) => isWithinInterval(new Date(startDate), interval));
}

export default createSelector(
  selectAllSessions,
  (_: unknown, props: number) => props,
  selectRelativeDaysSessions,
);
