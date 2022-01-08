import { Session } from '@types';
import selectAllSessions from 'features/home/redux/selectAllSessions';
import { createSelector } from 'reselect';
import subMonths from 'date-fns/subMonths';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import isWithinInterval from 'date-fns/isWithinInterval';
import format from 'date-fns/fp/format';
import { diffDateStrings } from 'features/home/redux/diffDateStrings';
import endOfDay from 'date-fns/endOfDay';
import { RootState } from '@common/configStore';

/**
 * Given a number of months ago selects the sessions of that day.
 */
function selectRelativeMonthsSessions(sessions: Session[], monthsAgo = 0) {
  const today = endOfDay(new Date());
  const monthRef = subMonths(startOfMonth(today), monthsAgo);
  const interval = { start: monthRef, end: endOfMonth(monthRef) };
  return sessions.filter(({ startDate }) => isWithinInterval(new Date(startDate), interval));
}

const formatWeek = format('Io');

/** @typedef {{ [name:string]: number}} WeekData */
/** @typedef {{ [date:string]: WeekData}} SessionsByWeek */
function groupSessionsByWeek(sessions: Session[]) {
  /** @type { {names: Set<string>, sessionsByWeek: SessionsByWeek} } */
  const initial = { names: new Set(), sessionsByWeek: {} };
  const { names, sessionsByWeek } = sessions.reduce(
    ({ names, sessionsByWeek }, { startDate, endDate, name }) => {
      const dateStr = formatWeek(new Date(startDate));
      names.add(name);
      const dayData = sessionsByWeek[dateStr] || { [name]: 0, startDate: dateStr };
      const duration = diffDateStrings(startDate, endDate);

      return {
        names,
        sessionsByWeek: {
          ...sessionsByWeek,
          [dateStr]: {
            ...dayData,
            [name]: (dayData[name] || 0) + duration,
          },
        },
      };
    },
    initial,
  );
  return { names: Array.from(names), sessions: Object.values(sessionsByWeek) };
}

export const selectMonthSessions = createSelector(
  selectAllSessions,
  (state: RootState) => state.stats.monthsAgo,
  selectRelativeMonthsSessions,
);

export default createSelector(selectMonthSessions, groupSessionsByWeek);
