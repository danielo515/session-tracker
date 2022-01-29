import { createSelector } from '@reduxjs/toolkit';
import { SessionWithAllDates } from '@types';
import { diffDateStrings } from 'features/home/redux/diffDateStrings';
import { formatWeek } from 'features/stats/redux/selectMonthChartData';
import { selectMonthByName } from './selectSessionsByName';

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
