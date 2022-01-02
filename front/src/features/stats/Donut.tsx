import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Title from './Title';
import PropTypes from 'prop-types';
import { stringToColour } from './stringToColour';
import { noop } from '@common/noop';
import { msToHuman } from 'formatters/formatDateDiff';

/**
 * @param {{name: string, duration: number }} param
 */
function getName({ name, duration }: { name: string; duration: number; }) {
  return `${name} - ${msToHuman(duration)}`;
}

/**
 * @param {{ sessions: { name: string, duration: number }[],
 *           title: React.ReactChild,
 *          }} props
 */
export default function Donut({ sessions, title }: { sessions: { name: string; duration: number; }[]; title: React.ReactChild; }) {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <ResponsiveContainer height="100%">
        <PieChart
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 10,
          }}
        >
          <Pie
            data={sessions}
            dataKey="duration"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            // @ts-ignore it actually accepts a function, types are wrong
            label={getName}
            paddingAngle={4}
          >
            {sessions.map(({ name }) => (
              <Cell key={name} fill={stringToColour(name)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
/**
 * The expected shape of the data is
 * sessions: {startDAte: String, task1: duration, task2: duration}
 * names: ['task1','task2']
 */
Donut.propTypes = {
  title: PropTypes.element,
  formatter: PropTypes.func,
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      duration: PropTypes.number,
    }),
  ),
};
Donut.defaultProps = {
  sessions: [],
  formatter: noop,
};
