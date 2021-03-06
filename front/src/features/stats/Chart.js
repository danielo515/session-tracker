import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Title from './Title';
import PropTypes from 'prop-types';
import { stringToColour } from './stringToColour';

/**
 * @param {{ sessions: import('../../types').Session[],
 *           title: React.ReactChild,
 *           names: string[],
 *          formatter: import('recharts').TickFormatterFunction }} props
 */
export default function Chart({ sessions, title, names, formatter }) {
  const theme = useTheme();
  const Bars = names.map(x => (
    <Bar key={x} dataKey={x} name={x} stackId="a" fill={stringToColour(x)} />
  ));
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <ResponsiveContainer height="100%">
        <BarChart
          data={sessions}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 10,
          }}
        >
          <XAxis dataKey="startDate" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} tickFormatter={formatter}>
            <Label
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              offset={0}
              angle={-90}
            >
              Duration
            </Label>
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Tooltip formatter={formatter} />
          {Bars}
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
/**
 * The expected shape of the data is
 * sessions: {startDAte: String, task1: duration, task2: duration}
 * names: ['task1','task2']
 */
Chart.propTypes = {
  title: PropTypes.string,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  formatter: PropTypes.func,
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired,
    }),
  ),
};
Chart.defaultProps = {
  sessions: [],
  formatter: i => i,
};
