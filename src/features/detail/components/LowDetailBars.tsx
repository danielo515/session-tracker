import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';

const data = [
  { x: 'a', y: 10 },
  { x: 'b', y: 20 },
  { x: 'c', y: 30 },
  { x: 'd', y: 60 },
  { x: 'e', y: 30 },
];
const verticalMargin = 20;

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

export function LowDetailBars({ width, height, events = false }: BarsProps) {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map((x) => x.x),
        padding: 0.4,
      }),
    [xMax],
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map((x) => x.y))],
      }),
    [yMax],
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = d.x;
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(d.y) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}
