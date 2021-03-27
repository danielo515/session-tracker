import React from 'react';
import { useSelector } from 'react-redux';
import Donut from './Donut';
import selectDonutSessions from './redux/selectDonutSessions';

/**
 * @typedef {import('rootReducer').RootState} State
 */

/**
 * @typedef {Object} Props
 * @property {number} daysAgo
 * @property {any} title
 */

/** @param {Props} props **/
export default function DonutContainer({ daysAgo, title }) {
  const sessions = useSelector(
    /** @param {State} state */
    state => {
      return selectDonutSessions(state, daysAgo);
    },
  );
  return <Donut sessions={sessions} title={title} />;
}
