import { Session, SessionGroup } from '@types';
import { createSelector } from 'reselect';
import { diffDateStrings } from './diffDateStrings';
import selectSessions from './selectSessions';

type Grouped = {
  [k: string]: SessionGroup;
};

function getTodayISO() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
}

/**
 *
 * Selects the sessions grouped by name
 * and also calculates the total for today
 * and the lastRun of this group of sessions.
 * This is done for performance and it is tied to the sessionsList view
 */
function selectGroupedSessions(sessions: Session[]) {
  const today = getTodayISO();
  const grouped = sessions.reduce((result: Grouped, session) => {
    const { name, startDate, endDate } = session;
    const group = result[name] || { name, sessions: [], total: 0, lastRun: startDate };
    group.sessions.push(session);
    group.total =
      today <= startDate ? group.total + diffDateStrings(startDate, endDate) : group.total;
    result[name] = group;
    return result;
  }, {});
  return Object.values(grouped);
}

export default createSelector(selectSessions, selectGroupedSessions);
