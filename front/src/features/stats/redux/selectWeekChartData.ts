import { Session, SessionWithAllDates } from '@types';
import selectAllSessions from 'features/home/redux/selectAllSessions';
import { createSelector } from 'reselect';
import subWeeks from 'date-fns/subWeeks';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import endOfDay from 'date-fns/endOfDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import format from 'date-fns/fp/format';
import { diffDateStrings } from 'features/home/redux/diffDateStrings';
import { RootState } from '@common/configStore';

/**
 * Given a number of weeks ago selects the sessions of that day.
 */
function selectRelativeWeeksSessions(
  sessions: SessionWithAllDates[],
  weeksAgo = 0,
): SessionWithAllDates[] {
  const today = endOfDay(new Date());
  const weekRef = subWeeks(startOfWeek(today), weeksAgo);
  const interval = { start: weekRef, end: endOfWeek(weekRef) };
  return sessions.filter(({ startDate }) => isWithinInterval(new Date(startDate), interval));
}

const formatDay = format('E do MMM');

type DayData = { [name: string]: number };
type SessionsByDay = { [date: string]: DayData };

function groupSessionsByDay(sessions: SessionWithAllDates[]) {
  const initial: { names: Set<string>; sessionsByDay: SessionsByDay } = {
    names: new Set(),
    sessionsByDay: {},
  };
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
  (state: RootState) => state.stats.weeksAgo,
  selectRelativeWeeksSessions,
);

export default createSelector(selectWeekSessions, groupSessionsByDay);
