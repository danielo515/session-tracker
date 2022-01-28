import { createSelector } from '@reduxjs/toolkit';
import { SessionWithAllDates } from '@types';
import { diffDateStrings } from 'features/home/redux/diffDateStrings';
import selectSessions from 'features/home/redux/selectSessions';
import { formatWeek } from 'features/stats/redux/selectMonthChartData';
import { selectRelativeMonthsSessions } from 'features/stats/redux/selectRelativeMonthsSessions';

const selectSessionsByName = createSelector(
  selectSessions,
  (_: unknown, props: { name: string }) => props.name,
  (sessions, name) => sessions.filter((s) => s.name === name),
);

const selectMonthByName = createSelector(selectSessionsByName, selectRelativeMonthsSessions);

const sumByWeek = (sessions: SessionWithAllDates[]) => {
  const initial = {} as { [week: string]: number };
  return sessions.reduce((result, session) => {
    const weekName = formatWeek(new Date(session.startDate));
    result[weekName] = result[weekName] || 0;
    result[weekName] += diffDateStrings(session.startDate, session.endDate);
    return result;
  }, initial);
};

export const selectMonthStatsByName = createSelector(selectMonthByName, sumByWeek);
