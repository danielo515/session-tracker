import subDays from 'date-fns/subDays';
import subWeeks from 'date-fns/subWeeks';
import subMonths from 'date-fns/subMonths';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import isWithinInterval from 'date-fns/isWithinInterval';
import format from 'date-fns/fp/format';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInHours from 'date-fns/differenceInHours';
/**
 * 
 * @param {Function} formatter should format the date to string
 * @returns {[date]: { [name]: Number} } hashmap of name-value indexed by formatted date
 */
export const addToRow = (formatter, diffCalc) => (map, { name, startDate, endDate }) => {
    const duration = diffCalc(new Date(endDate || Date.now()), new Date(startDate));
    const date = formatter(new Date(startDate));
    const existing = (map[date] || {})
    const names = map.names || new Set()
    names.add(name)
    return {
        ...map,
        names,
        [date]: {
            ...existing,
            [name]: (existing[name] || 0) + duration,
            startDate: date,
        }
    };
};

window.hoursdiff = differenceInHours;
const diffInHours = (a,b) => (differenceInMinutes(a, b) / 60);
const makeDayRow = addToRow(format('HH:mm'), differenceInMinutes);
const makeWeekRow = addToRow(format('E do MMM'), differenceInMinutes);
const makeMonthRow = addToRow(format('Io'), diffInHours);

const omitNamesProp = ({ names, ...rest }) => rest


export function createChartData({ daysAgo, weeksAgo = 0, monthsAgo = 0, sessions }) {
    const today = endOfDay(new Date());

    const dayRef = subDays(today, daysAgo);
    const dayInterval = { start: startOfDay(dayRef), end: endOfDay(dayRef) };

    const weekRef = subWeeks(startOfWeek(today), weeksAgo);
    const weekInterval = { start: weekRef, end: endOfWeek(weekRef) };

    const monthRef = subMonths(startOfMonth(today), monthsAgo);
    const monthInterval = { start: monthRef, end: today };
    // This was a series of filters and maps chained, but reduce is way more performant and powerful
    const chartData = sessions.reduce(
        (acc, session) => {
            const d = new Date(session.startDate)
            if (isWithinInterval(d, dayInterval)) acc.d = makeDayRow(acc.d, session)
            if (isWithinInterval(d, weekInterval)) acc.w = makeWeekRow(acc.w, session)
            if (isWithinInterval(d, monthInterval)) acc.m = makeMonthRow(acc.m, session)
            return acc; // I don't usually mutate, but this is a big performance gain on this case
        },
        { d: { names: new Set() }, w: { names: new Set() }, m: { names: new Set() } }) // I was originally using longer names, but I think this is obvious

    return {
        dayData: { data: Object.values(omitNamesProp(chartData.d)), names: [...chartData.d.names] },
        weekData: { data: Object.values(omitNamesProp(chartData.w)), names: [...chartData.w.names] },
        monthData: { data: Object.values(omitNamesProp(chartData.m)), names: [...chartData.m.names] }
    }
}
