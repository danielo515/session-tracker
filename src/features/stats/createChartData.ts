import isWithinInterval from 'date-fns/isWithinInterval';
import { Session } from '@types';
import format from 'date-fns/fp/format';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { getTodayIntervals } from 'dateUtils/getIntervals';

type Row = { startDate: string; [name: string]: number | string };
type MapRow = { names: Set<string>; [date: string]: Row | Set<string> };
type AddToRow = (
  formatter: (d: Date) => string,
  diffCalc: (a: Date, b: Date) => number,
) => (map: MapRow, session: Session) => MapRow;

export const addToRow: AddToRow =
  (formatter, diffCalc) =>
  (map, { name, startDate, endDate }) => {
    const duration = diffCalc(new Date(endDate || Date.now()), new Date(startDate));
    const date = formatter(new Date(startDate));

    const existing = map[date] || ({} as Row);
    const names = map.names || new Set();
    names.add(name);
    return {
      ...map,
      names,
      [date]: {
        ...existing,
        // @ts-expect-error TODO fix this with fresh mind
        [name]: (existing[name] || 0) + duration,
        startDate: date,
      },
    };
  };

const makeWeekRow = addToRow(format('E do MMM'), differenceInMinutes);
const makeMonthRow = addToRow(format('Io'), differenceInMinutes);

type HasName = {
  names: Set<string>;
};
const omitNamesProp = ({ names, ...rest }: HasName) => rest;

export function createChartData({
  weeksAgo = 0,
  monthsAgo = 0,
  sessions,
}: {
  weeksAgo: number;
  monthsAgo: number;
  sessions: Session[];
}) {
  const { weekInterval, monthInterval } = getTodayIntervals({ weeksAgo, monthsAgo });
  // This was a series of filters and maps chained, but reduce is way more performant and powerful
  const chartData = sessions.reduce(
    (acc, session) => {
      const d = new Date(session.startDate);
      if (isWithinInterval(d, weekInterval)) acc.w = makeWeekRow(acc.w, session);
      if (isWithinInterval(d, monthInterval)) acc.m = makeMonthRow(acc.m, session);
      return acc; // I don't usually mutate, but this is a big performance gain on this case
    },
    {
      d: { names: new Set<string>() },
      w: { names: new Set<string>() },
      m: { names: new Set<string>() },
    },
  ); // I was originally using longer names, but I think this is obvious

  return {
    weekData: { data: Object.values(omitNamesProp(chartData.w)), names: [...chartData.w.names] },
    monthData: { data: Object.values(omitNamesProp(chartData.m)), names: [...chartData.m.names] },
  };
}
