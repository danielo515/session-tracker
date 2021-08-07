/** @typedef {import("@types").SessionGroup} SessionGroup*/
/** @typedef {{[k: string]: SessionGroup | undefined }} Grouped */

import { createSelector } from 'reselect';
import { diffDateStrings } from './diffDateStrings';
import selectSessions from './selectSessions';

function getTodayISO() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
}

/**
 *
 * @param {import("@types").Session[]} sessions
 * @returns {SessionGroup[]}
 */
function selectGroupedSessions(sessions: any) {
  const today = getTodayISO();
  const grouped = sessions.reduce(
    /**
     * @param {Grouped} result
     */
    (result: any, session: any) => {
      const { name, startDate, endDate } = session;
      const group = result[name] || { name, sessions: [], total: 0, lastRun: startDate };
      group.sessions.push(session);
      group.total =
        today <= startDate ? group.total + diffDateStrings(startDate, endDate) : group.total;
      result[name] = group;
      return result;
    },
    {},
  );
  return Object.values(grouped);
}

export default createSelector(selectSessions, selectGroupedSessions);
