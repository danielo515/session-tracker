/** @typedef {import("@types").Session} Session*/

import isWithinInterval from 'date-fns/fp/isWithinInterval';
import selectRunningSession from 'features/home/redux/selectRunningSession';
import selectSessions from 'features/home/redux/selectSessions';
import { createSelector } from 'reselect';
import { getTodayIntervals } from 'dateUtils/getIntervals';
import { calculateSessionDuration } from '@common/calculateSessionDuration';

/**
 * @typedef {{
 *  today: number, todayCount: number,
 *  thisWeek: number,
 *  thisMonth: number,
 *  allTime: number,
 *  count: number
 * }} Stats */

/**
 * @param {String} sessionName
 * */
export const getSessionStatsReducer = sessionName => {
  const { weekInterval, monthInterval, todayInterval } = getTodayIntervals();
  const isToday = isWithinInterval(todayInterval);
  const isThisWeek = isWithinInterval(weekInterval);
  const isThisMonth = isWithinInterval(monthInterval);
  /**
   * @param {Session} session
   * @param {Stats} acc}
   * */
  return (acc, session) => {
    if (session.name !== sessionName) {
      return acc;
    }
    const sessionDate = new Date(session.startDate);
    const sessionDuration = calculateSessionDuration(session);
    if (isToday(sessionDate)) {
      acc.today += sessionDuration;
      acc.todayCount += 1;
    }
    if (isThisWeek(sessionDate)) {
      acc.thisWeek += sessionDuration;
    }
    if (isThisMonth(sessionDate)) {
      acc.thisMonth += sessionDuration;
    }
    acc.allTime += sessionDuration;
    acc.count += 1;
    return acc;
  };
};

/**
 *
 * @returns {Stats}
 */
export const getInitialValue = () => ({
  today: 0,
  todayCount: 0,
  thisMonth: 0,
  thisWeek: 0,
  allTime: 0,
  count: 0,
});

/**
 * This selector is used to get the running session stats.
 * However, if you need real time updates (e.g. to also include the running session and update the UI),
 * this selector should not be used because it can experience caching issues.
 * For that it's better to use selectSessionStatsByName and sum the duration of the running session.
 * @param {Session[]} sessions
 * @param {Session | null} runningSession
 * @returns {Stats}
 */
function selectRunningSessionStats(sessions, runningSession) {
  const initialStats = getInitialValue();
  if (!runningSession) return initialStats;
  return [...sessions, { ...runningSession, endDate: new Date().toISOString() }].reduce(
    getSessionStatsReducer(runningSession.name),
    initialStats,
  );
}

export default createSelector(selectSessions, selectRunningSession, selectRunningSessionStats);