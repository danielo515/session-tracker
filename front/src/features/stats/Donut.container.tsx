import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'rootReducer';
import Donut from './Donut';
import selectDonutSessions from './redux/selectDonutSessions';
import selectWeekChartData from './redux/selectWeekChartData';

/**
 * @typedef {import('rootReducer').RootState} State
 */

/**
 * @typedef {Object} Props
 * @property {any} title
 */

/** @param {Props} props **/
export default function DonutContainer({ title }: any) {
  const sessions = useSelector((state: RootState) => {
    console.log(selectWeekChartData(state));
    return selectDonutSessions(state, state.stats.daysAgo);
  });
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'any[]' is not assignable to type '{ name?: s... Remove this comment to see the full error message
  return <Donut sessions={sessions} title={title} />;
}
