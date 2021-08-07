import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Title from './Title';
import { stringToColour } from './stringToColour';
import { noop } from 'common/noop';
import { msToHuman } from 'formatters/formatDateDiff';

/**
 * @param {{name: string, duration: number }} param
 */
function getName({
  name,
  duration
}: any) {
  return `${name} - ${msToHuman(duration)}`;
}

type OwnProps = {
    title?: React.ReactElement;
    formatter?: (...args: any[]) => any;
    sessions?: {
        name?: string;
        duration?: number;
    }[];
};

// @ts-expect-error ts-migrate(2565) FIXME: Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type Props = OwnProps & typeof Donut.defaultProps;

/**
 * @param {{ sessions: { name: string, duration: number }[],
 *           title: React.ReactChild,
 *          }} props
 */
export default function Donut({ sessions, title }: Props) {
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
Donut.defaultProps = {
  sessions: [],
  formatter: noop,
};
