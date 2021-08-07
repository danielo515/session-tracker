import React from 'react';
import { useSelector } from 'react-redux';
import Chart from './Chart';
import selectMonthChartData from './redux/selectMonthChartData';
import { msToHoursMinutes } from '@common/minsToHoursMinutes';

/**
 * @typedef {import('rootReducer').RootState} State
 */

export default function MonthChart() {
  const { names, sessions } = useSelector(
    /** @param {State} state */
    state => {
      return selectMonthChartData(state);
    },
  );
  return <Chart formatter={msToHoursMinutes} sessions={sessions} names={names} title="Month" />;
}
