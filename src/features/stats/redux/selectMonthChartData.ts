import { SessionWithAllDates } from '@types';
import selectAllSessions from 'features/home/redux/selectAllSessions';
import { createSelector } from 'reselect';
import format from 'date-fns/fp/format';
import { diffDateStrings } from 'features/home/redux/diffDateStrings';
import { RootState } from '@common/configStore';
import { selectRelativeMonthsSessions } from './selectRelativeMonthsSessions';

export const formatWeek = format('wo');

type WeekData = { [name: string]: number };
type SessionsByWeek = { [date: string]: WeekData };
type Initial = { names: Set<string>; sessionsByWeek: SessionsByWeek };

function groupSessionsByWeek(sessions: SessionWithAllDates[]) {
  const initial: Initial = { names: new Set(), sessionsByWeek: {} };
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
