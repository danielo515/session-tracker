import { msToHuman } from 'formatters/formatDateDiff';
import React from 'react';
import { useSelector } from 'react-redux';
import Chart from './Chart';
import selectWeekChartData from './redux/selectWeekChartData';
import { WeeksNavigator } from './NavigationControls';

/**
 * @typedef {import('rootReducer').RootState} State
 */

export default function WeekChart() {
  const { names, sessions } = useSelector(
    /** @param {State} state */
    state => {
      return selectWeekChartData(state);
    },
  );
  return (
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown[]' is not assignable to type '{ star... Remove this comment to see the full error message
    <Chart formatter={msToHuman} sessions={sessions} names={names} title={<WeeksNavigator />} />
  );
}
