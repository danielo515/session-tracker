/** @typedef {import("@types").Session} Session*/

import isWithinInterval from 'date-fns/fp/isWithinInterval';
import selectRunningSession from 'features/home/redux/selectRunningSession';
import selectSessions from 'features/home/redux/selectSessions';
import { createSelector } from 'reselect';
import { getTodayIntervals } from 'dateUtils/getIntervals';
import { calculateSessionDuration } from '@common/calculateSessionDuration';

/** @typedef {{ today: number, thisWeek: number, thisMonth: number}} Stats */

/**
 * @param {String} sessionName
 * */
export const getSessionStatsReducer = (sessionName: any) => {
  const { weekInterval, monthInterval, todayInterval } = getTodayIntervals();
  const isToday = isWithinInterval(todayInterval);
  const isThisWeek = isWithinInterval(weekInterval);
  const isThisMonth = isWithinInterval(monthInterval);
  /**
   * @param {Session} session
   * @param {Stats} acc}
   * */
  return (acc: any, session: any) => {
    if (session.name !== sessionName) {
      return acc;
    }
    const sessionDate = new Date(session.startDate);
    const sessionDuration = calculateSessionDuration(session);
    if (isToday(sessionDate)) {
      acc.today += sessionDuration;
    }
    if (isThisWeek(sessionDate)) {
      acc.thisWeek += sessionDuration;
    }
    if (isThisMonth(sessionDate)) {
      acc.thisMonth += sessionDuration;
    }
    return acc;
  };
};

/**
 * This selector is used to get the running session stats.
 * However, if you need real time updates (e.g. to also include the running session and update the UI),
 * this selector should not be used because it can experience caching issues.
 * For that it's better to use selectSessionStatsByName and sum the duration of the running session.
 * @param {Session[]} sessions
 * @param {Session | null} runningSession
 * @returns {Stats}
 */
function selectRunningSessionStats(sessions: any, runningSession: any) {
  const initialStats = { today: 0, thisMonth: 0, thisWeek: 0 };
  if (!runningSession) return initialStats;
  return [...sessions, { ...runningSession, endDate: new Date().toISOString() }].reduce(
    getSessionStatsReducer(runningSession.name),
    initialStats,
  );
}

export default createSelector(selectSessions, selectRunningSession, selectRunningSessionStats);
