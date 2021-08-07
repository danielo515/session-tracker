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
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown[]' is not assignable to type '{ star... Remove this comment to see the full error message
  return <Chart formatter={msToHoursMinutes} sessions={sessions} names={names} title="Month" />;
}
