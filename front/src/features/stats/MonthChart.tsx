import React from 'react';
import { useSelector } from 'react-redux';
import Chart from './Chart';
import selectMonthChartData from './redux/selectMonthChartData';
import { msToHoursMinutes } from '@common/minsToHoursMinutes';
import { RootState } from 'rootReducer';

export default function MonthChart() {
  const { names, sessions } = useSelector((state: RootState) => {
    return selectMonthChartData(state);
  });
  return <Chart formatter={msToHoursMinutes} sessions={sessions} names={names} title="Month" />;
}
