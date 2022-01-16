import React from 'react';
import { useSelector } from 'react-redux';
import Donut from './Donut';
import selectDonutSessions from './redux/selectDonutSessions';
import selectWeekChartData from './redux/selectWeekChartData';
import { RootState } from '@common/configStore';

type Props = {
  title: React.ReactNode;
};
export default function DonutContainer({ title }: Props) {
  const sessions = useSelector((state: RootState) => {
    return selectDonutSessions(state, state.stats.daysAgo);
  });
  return <Donut sessions={sessions} title={title} />;
}
