import { msToHuman } from 'formatters/formatDateDiff';
import React from 'react';
import { useSelector } from 'react-redux';
import Chart from './Chart';
import selectWeekChartData from './redux/selectWeekChartData';
import { WeeksNavigator } from './NavigationControls';

/**
 * @typedef {import('rootReducer').RootState} State
 */

export default function MonthChart() {
  const { names, sessions } = useSelector(
    /** @param {State} state */
    state => {
      return selectWeekChartData(state);
    },
  );
  return (
    <Chart formatter={msToHuman} sessions={sessions} names={names} title={<WeeksNavigator />} />
  );
}
