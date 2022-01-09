/** @typedef {import("@types").Session} Session*/

import { calculateSessionDuration } from '@common/calculateSessionDuration';
import { Session } from '@types';
import { createSelector } from 'reselect';
import selectTodaySessions from './selectTodaySessions';

/**
 *
 * @param {Session[]} todaySessions
 * @param {String?} sessionName
 * @returns {number}
 */
function selectTodaySessionDuration(todaySessions: Session[], sessionName: string | null) {
  if (!sessionName) return 0;
  return todaySessions.reduce(
    (total, session) =>
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
  (_: unknown, sessionName: string | null) => sessionName,
  selectTodaySessionDuration,
);
