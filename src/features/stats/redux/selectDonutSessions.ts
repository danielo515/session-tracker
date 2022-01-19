/** @typedef {import("@types").Session} Session*/

import { Session, SessionWithAllDates } from '@types';
import { createSelector } from 'reselect';
import selectRelativeDaysSessions from './selectRelativeDaysSessions';

const msInADay = 864e5;
/**
 * @param {Date|string} start
 * @param {Date|string} end
 */
function dateDiff(start: Date | string, end: Date | string = new Date()) {
  return new Date(end).getTime() - new Date(start).getTime();
}

/**
 * Reducer function that adds duration to a session and keeps
 * track of the amount of unused milliseconds
 */
const addDurationToSessions = (
  { all, unused }: { all: Map<string, { name: string; duration: number }>; unused: number },
  session: SessionWithAllDates,
) => {
  const duration = dateDiff(session.startDate, session.endDate);
  const { name, duration: oldDuration } = all.get(session.name) || {
    duration: 0,
    name: session.name,
  };
  all.set(name, { ...session, duration: (oldDuration || 0) + duration });

  return {
    unused: unused - duration,
    all,
  };
};

/**
 *
 * @param {Session[]} sessions
 * @returns {{name: string, duration: number}[]}
 */
function selectDonutSessions(sessions: Omit<Session, 'id'>[]) {
  const initialValue = { all: new Map(), unused: msInADay };
  const { all, unused } = sessions.reduce(addDurationToSessions, initialValue);

  const allSessions = Array.from(all, ([_, value]) => value);

  return unused > 0 ? allSessions.concat([{ duration: unused, name: 'Unused' }]) : allSessions;
}

export default createSelector(selectRelativeDaysSessions, selectDonutSessions);
