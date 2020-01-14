import subDays from 'date-fns/subDays';
import subWeeks from 'date-fns/subWeeks';
import subMonths from 'date-fns/subMonths';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import startOfWeek from 'date-fns/startOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import isWithinInterval from 'date-fns/isWithinInterval';
import { createData } from './createData';
import format from 'date-fns/fp/format';

const createDayData = createData(format('HH:mm'));
const createWeekData = createData(format('E do'));


export function createChartData({daysAgo,weeksAgo=0,monthsAgo=0,sessions}) {
    const today = endOfDay(new Date());

    const dayRef = subDays(today, daysAgo);
    const dayInterval = { start: startOfDay(dayRef), end: today };

    const weekRef = subWeeks(startOfWeek(today), weeksAgo);
    const weekInterval = { start: weekRef, end: today };

    const monthRef = subMonths(startOfMonth(today), monthsAgo);
    const monthInterval = { start: monthRef, end: today };
    // This was a series of filters and maps chained, but reduce is way more performant and powerful
    const chartData = sessions.reduce(
        (acc,session) =>{
        const d = new Date(session.startDate)
        const {dayData, weekData, monthData} = acc;
        if(isWithinInterval(d, dayInterval)) dayData.push(createDayData(session))
        if(isWithinInterval(d, weekInterval)) weekData.push(createWeekData(session))
        if(isWithinInterval(d, monthInterval)) monthData.push(createWeekData(session))
        return acc; // I don't usually mutate, but this is a big performance gain on this case
    },
    {dayData:[], weekData:[], monthData:[]})

    console.log(chartData)
    return chartData
}
