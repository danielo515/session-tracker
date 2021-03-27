/** @typedef {import("@types").Session} Session*/

import selectAllSessions from 'features/home/redux/selectAllSessions';
import { createSelector } from 'reselect';
import subDays from 'date-fns/subDays';
import { isWithinInterval, startOfDay } from 'date-fns';
import { endOfDay } from 'date-fns/esm';

/**
 * Given a number of days ago selects the sessions of that day.
 * @param {Session[]} sessions
 * @returns {Session[]}
 */
function selectRelativeDaysSessions(sessions, daysAgo = 0) {
  const today = endOfDay(new Date());
  const dayRef = subDays(today, daysAgo);
  const interval = { start: startOfDay(dayRef), end: endOfDay(dayRef) };
  return sessions.filter(({ startDate }) => isWithinInterval(new Date(startDate), interval));
}

export default createSelector(
  selectAllSessions,
  /**
   * stupid function to provide the props to the selector
   * @param {any} _
   * @param {number} props the props from the component
   */
  (_, props) => props,
  selectRelativeDaysSessions,
);
