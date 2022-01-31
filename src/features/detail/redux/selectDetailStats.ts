import { createSelector } from '@reduxjs/toolkit';
import { isThisWeek } from 'date-fns/esm';
import { diffDateStrings } from 'features/home/redux/diffDateStrings';
import { selectMonthByName } from './selectSessionsByName';

export const selectDetailStats = createSelector(selectMonthByName, (sessions) => {
  return sessions.reduce(
    (result, session) => {
      const duration = diffDateStrings(session.startDate, session.endDate);
      if (isThisWeek(new Date(session.startDate))) {
        result.weekTotal += duration;
      }
      result.monthTotal += duration;
      return result;
    },
    { monthTotal: 0, weekTotal: 0 },
  );
});
