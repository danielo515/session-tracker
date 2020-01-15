import subDays from 'date-fns/subDays';
import subWeeks from 'date-fns/subWeeks';
import subMonths from 'date-fns/subMonths';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import startOfWeek from 'date-fns/startOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import isWithinInterval from 'date-fns/isWithinInterval';
import format from 'date-fns/fp/format';
import differenceInMinutes from 'date-fns/differenceInMinutes';
// Generate Sales Data

export const addToRow = formatter => (map, { name, startDate, endDate }) => {
    const duration = differenceInMinutes(new Date(endDate || Date.now()), new Date(startDate));
    const date = formatter(new Date(startDate));
    const existing = (map[date] || { duration: 0 })
    return {
        ...map,
        [date]: {
            ...existing,
            [name]: existing.duration + duration,
            startDate: date
        }
    };
};


const makeDayRow = addToRow(format('HH:mm'));
const makeWeekRow = addToRow(format('E do'));


export function createChartData({ daysAgo, weeksAgo = 0, monthsAgo = 0, sessions }) {
    const today = endOfDay(new Date());

    const dayRef = subDays(today, daysAgo);
    const dayInterval = { start: startOfDay(dayRef), end: today };

    const weekRef = subWeeks(startOfWeek(today), weeksAgo);
    const weekInterval = { start: weekRef, end: today };

    const monthRef = subMonths(startOfMonth(today), monthsAgo);
    const monthInterval = { start: monthRef, end: today };
    // This was a series of filters and maps chained, but reduce is way more performant and powerful
    const chartData = sessions.reduce(
        (acc, session) => {
            const d = new Date(session.startDate)
            acc.names.add(session.name);
            if (isWithinInterval(d, dayInterval)) acc.d = makeDayRow(acc.d, session)
            if (isWithinInterval(d, weekInterval)) acc.w = makeWeekRow(acc.w, session)
            if (isWithinInterval(d, monthInterval)) acc.m = makeWeekRow(acc.m, session)
            return acc; // I don't usually mutate, but this is a big performance gain on this case
        },
        { d: {}, w: {}, m: {}, names: new Set() }) // I was originally using longer names, but I think this is obvious

        console.log(chartData);
    
    return {
        dayData: Object.values(chartData.d),
        weekData: Object.values(chartData.w),
        monthData: Object.values(chartData.m),
        names: [...chartData.names]
    }
}
