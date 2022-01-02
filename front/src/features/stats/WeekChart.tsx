import { msToHuman } from 'formatters/formatDateDiff';
import React from 'react';
import { useSelector } from 'react-redux';
import Chart from './Chart';
import selectWeekChartData from './redux/selectWeekChartData';
import { WeeksNavigator } from './NavigationControls';
import { RootState } from 'rootReducer';

export default function WeekChart() {
  const { names, sessions } = useSelector((state: RootState) => {
    return selectWeekChartData(state);
  });
  return (
    <Chart formatter={msToHuman} sessions={sessions} names={names} title={<WeeksNavigator />} />
  );
}
