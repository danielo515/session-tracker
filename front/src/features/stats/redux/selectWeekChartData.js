/** @typedef {import("@types").Session} Session*/

import selectAllSessions from 'features/home/redux/selectAllSessions';
import { createSelector } from 'reselect';
import subWeeks from 'date-fns/subWeeks';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import endOfDay from 'date-fns/endOfDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import format from 'date-fns/fp/format';
import { diffDateStrings } from 'features/home/redux/diffDateStrings';

/**
 * Given a number of weeks ago selects the sessions of that day.
 * @param {Session[]} sessions
 * @returns {Session[]}
 */
function selectRelativeWeeksSessions(sessions, weeksAgo = 0) {
  const today = endOfDay(new Date());
  const weekRef = subWeeks(startOfWeek(today), weeksAgo);
  const interval = { start: weekRef, end: endOfWeek(weekRef) };
  return sessions.filter(({ startDate }) => isWithinInterval(new Date(startDate), interval));
}

const formatDay = format('E do MMM');

/** @typedef {{ [name:string]: number}} DayData */
/** @typedef {{ [date:string]: DayData}} SessionsByDay */
/**
 *
 * @param {Session[]} sessions
 */
function groupSessionsByDay(sessions) {
  /** @type { {names: Set<string>, sessionsByDay: SessionsByDay} } */
  const initial = { names: new Set(), sessionsByDay: {} };
  const { names, sessionsByDay } = sessions.reduce(
    ({ names, sessionsByDay }, { startDate, endDate, name }) => {
      const dateStr = formatDay(new Date(startDate));
      names.add(name);
      const dayData = sessionsByDay[dateStr] || { [name]: 0, startDate: dateStr };
      const duration = diffDateStrings(startDate, endDate);

      return {
        names,
        sessionsByDay: {
          ...sessionsByDay,
          [dateStr]: {
            ...dayData,
            [name]: (dayData[name] || 0) + duration,
          },
        },
      };
    },
    initial,
  );
  return { names: Array.from(names), sessions: Object.values(sessionsByDay) };
}

export const selectWeekSessions = createSelector(
  selectAllSessions,
  /**
   * @param {import('rootReducer').RootState} state
   */
  state => state.stats.weeksAgo,
  selectRelativeWeeksSessions,
);

export default createSelector(selectWeekSessions, groupSessionsByDay);
