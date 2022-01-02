/** @typedef {import("@types").Session} Session*/

import { createSelector } from 'reselect';
import selectRunningSession from './selectRunningSession';
import selectSessions from './selectSessions';

/**
 *
 * @param {Session[]} sessions
 * @param {Session | null} runningSession
 * @returns {Session[]}
 */
function selectAllSessions(sessions: Session[], runningSession: Session | null) {
  if (!runningSession) return sessions;
  return [...sessions, { ...runningSession, endDate: new Date().toISOString() }].reverse();
}

export default createSelector(selectSessions, selectRunningSession, selectAllSessions);
