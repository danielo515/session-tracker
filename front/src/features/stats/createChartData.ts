import isWithinInterval from 'date-fns/isWithinInterval';
import format from 'date-fns/fp/format';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { getTodayIntervals } from 'dateUtils/getIntervals';
/** @typedef {import('@types').Session} Session*/
/** @typedef {{ startDate: string, [name: string]: number|string }}  Row hashmap of name-value indexed by formatted date**/
/** @typedef {{names: Set<string>, [date:string]: Row|Set<string> }} MapRow **/
/**
 *
 * @param {Function} diffCalc
 * @param {(d:Date) => string} formatter should format the date to string
 * @returns {(map:MapRow, session:Session) => MapRow}
 */
export const addToRow = (formatter: any, diffCalc: any) => (map: any, {
  name,
  startDate,
  endDate
}: any) => {
  const duration = diffCalc(new Date(endDate || Date.now()), new Date(startDate));
  const date = formatter(new Date(startDate));

  const existing = /** @type { Row }*/ (map[date] || {});
  const names = map.names || new Set();
  names.add(name);
  return {
    ...map,
    names,
    [date]: {
      ...existing,
      [name]: (existing[name] || 0) + duration,
      startDate: date,
    },
  };
};

const makeWeekRow = addToRow(format('E do MMM'), differenceInMinutes);
const makeMonthRow = addToRow(format('Io'), differenceInMinutes);

/**
 *
 * @template {{names: Set<string>}} HasName
 * @param {HasName} args
 */
const omitNamesProp = ({
  names,
  ...rest
}: any) => rest;

/**
 *
 * @param {{  weeksAgo: number , monthsAgo: number, sessions: import('../../types').Session[]} } args
 */
export function createChartData({
  weeksAgo = 0,
  monthsAgo = 0,
  sessions
}: any) {
  const { weekInterval, monthInterval } = getTodayIntervals({ weeksAgo, monthsAgo });
  // This was a series of filters and maps chained, but reduce is way more performant and powerful
  const chartData = sessions.reduce(
    (acc: any, session: any) => {
      const d = new Date(session.startDate);
      if (isWithinInterval(d, weekInterval)) acc.w = makeWeekRow(acc.w, session);
      if (isWithinInterval(d, monthInterval)) acc.m = makeMonthRow(acc.m, session);
      return acc; // I don't usually mutate, but this is a big performance gain on this case
    },
    { d: { names: new Set() }, w: { names: new Set() }, m: { names: new Set() } },
  ); // I was originally using longer names, but I think this is obvious

  return {
    weekData: { data: Object.values(omitNamesProp(chartData.w)), names: [...chartData.w.names] },
    monthData: { data: Object.values(omitNamesProp(chartData.m)), names: [...chartData.m.names] },
  };
}
