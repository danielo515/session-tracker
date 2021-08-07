/** @typedef {import("@types").Session} Session*/

import { createSelector } from 'reselect';
import selectRelativeDaysSessions from './selectRelativeDaysSessions';

const msInADay = 864e5;
/**
 * @param {Date|string} start
 * @param {Date|string} end
 */
function dateDiff(start: any, end = new Date()) {
  return new Date(end).getTime() - new Date(start).getTime();
}

/**
 * Reducer function that adds duration to a session and keeps
 * track of the amount of unused milliseconds
 * @param {{all: Map<string,{name: string, duration: number}>, unused: number}} param0
 * @param {Session} session
 */
const addDurationToSessions = ({
  all,
  unused
}: any, session: any) => {
  const duration = dateDiff(session.startDate, session.endDate);
  const { name, duration: oldDuration = 0 } = all.get(session.name) || session;
  all.set(name, { ...session, duration: oldDuration + duration });

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
function selectDonutSessions(sessions: any) {
  const initialValue = { all: new Map(), unused: msInADay };
  const { all, unused } = sessions.reduce(addDurationToSessions, initialValue);

  const allSessions = Array.from(all, ([_, value]) => value);

  return unused > 0 ? allSessions.concat([{ duration: unused, name: 'Unused' }]) : allSessions;
}

export default createSelector(selectRelativeDaysSessions, selectDonutSessions);
