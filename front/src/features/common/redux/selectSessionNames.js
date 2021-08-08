import { createSelector } from 'reselect';
import selectSessions from '../../home/redux/selectSessions';

/**
 * @param {Session[]} Sessions
 */
function selectSessionsNames(sessions) {
  return Array.from(new Set(sessions.map(({ name }) => name)));
}

export default createSelector(selectSessions, selectSessionsNames);
