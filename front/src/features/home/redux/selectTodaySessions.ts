/** @typedef {import("@types").Session} Session*/

import { isWithinInterval } from 'date-fns';
import { startOfDay } from 'date-fns/esm';
import { createSelector } from 'reselect';
import selectRunningSession from './selectRunningSession';
import selectSessions from './selectSessions';

/**
 *
 * @param {Session[]} sessions
 * @param {Session | null} runningSession
 * @returns {Session[]}
 */
function selectTodaySessions(sessions: any, runningSession: any) {
  const todaySessions = sessions.filter((session: any) => isWithinInterval(new Date(session.startDate), {
    start: startOfDay(new Date()),
    end: new Date(new Date().setHours(23, 59, 59, 999)),
  }),
  );
  if (!runningSession) return todaySessions;
  return [...todaySessions, { ...runningSession, endDate: new Date().toISOString() }].reverse();
}

export default createSelector(selectSessions, selectRunningSession, selectTodaySessions);
