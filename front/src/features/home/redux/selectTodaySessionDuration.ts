/** @typedef {import("@types").Session} Session*/

import { calculateSessionDuration } from '@common/calculateSessionDuration';
import { Session } from '@types';
import { createSelector } from 'reselect';
import selectTodaySessions from './selectTodaySessions';

function selectTodaySessionDuration(
  todaySessions: Pick<Session, 'name' | 'startDate' | 'endDate'>[],
  sessionName: string | null,
): number {
  if (!sessionName) return 0;
  return todaySessions.reduce(
    (total, session) =>
      session.name === sessionName ? total + calculateSessionDuration(session) : total,
    0,
  );
}

export default createSelector(
  selectTodaySessions,
  (_: unknown, sessionName: string | null) => sessionName,
  selectTodaySessionDuration,
);
