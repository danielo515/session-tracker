/** @typedef {import("@types").Session} Session*/

import { calculateSessionDuration } from '@common/calculateSessionDuration';
import { createSelector } from 'reselect';
import selectTodaySessions from './selectTodaySessions';

/**
 *
 * @param {Session[]} todaySessions
 * @param {String?} sessionName
 * @returns {number}
 */
function selectTodaySessionDuration(todaySessions: any, sessionName: any) {
  if (!sessionName) return 0;
  return todaySessions.reduce(
    (total: any, session: any) =>
      session.name === sessionName ? total + calculateSessionDuration(session) : total,
    0,
  );
}

export default createSelector(
  selectTodaySessions,
  /**
   * @param {unknown} _
   * @param {String?} sessionName
   **/
  (_: any, sessionName: any) => sessionName,
  selectTodaySessionDuration,
);
