import React from 'react';
import { useSelector } from 'react-redux';
import Donut from './Donut';
import selectDonutSessions from './redux/selectDonutSessions';

/**
 * @typedef {import('rootReducer').RootState} State
 */

/**
 * @typedef {Object} Props
 * @property {any} title
 */

/** @param {Props} props **/
export default function DonutContainer({ title }) {
  const sessions = useSelector(
    /** @param {State} state */
    state => {
      return selectDonutSessions(state, state.stats.daysAgo);
    },
  );
  return <Donut sessions={sessions} title={title} />;
}
