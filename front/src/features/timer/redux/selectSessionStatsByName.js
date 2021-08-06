import selectSessions from 'features/home/redux/selectSessions';
import { createSelector } from 'reselect';
import { getSessionStatsReducer } from './selectRunningSessionStats';

/** @typedef {import("@types").Session} Session*/
/** @typedef {import('./selectRunningSessionStats').Stats} Stats */

/**
 * @param {any} _
 * @param {string} name
 * */
function getNameFromProps(_, name) {
  return name;
}

/**
 * Selects the stats of the session with the given name.
 * It does not include the running session.
 * For that use selectRunningSessionStats, but we aware of possible caching issues.
 * @param {Session[]} sessions
 * @param {string} [ sessionName ]
 * @returns {Stats}
 */
function selectSessionStatsByName(sessions, sessionName) {
  const initialStats = {
    today: 0,
    thisMonth: 0,
    thisWeek: 0,
  };
  if (!sessionName) return initialStats;
  return sessions.reduce(getSessionStatsReducer(sessionName), initialStats);
}

export default createSelector(selectSessions, getNameFromProps, selectSessionStatsByName);
