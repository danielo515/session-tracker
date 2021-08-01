import { endOfWeek, endOfDay, subWeeks, startOfMonth, startOfWeek, subMonths } from 'date-fns';

/**
 * Returns week and month intervals from today
 * going back as much as requested for each interval type.
 */
export function getTodayIntervals({ weeksAgo = 0, monthsAgo = 0 } = {}) {
  const today = endOfDay(new Date());

  const weekRef = subWeeks(startOfWeek(today), weeksAgo);
  const weekInterval = { start: weekRef, end: endOfWeek(weekRef) };

  const monthRef = subMonths(startOfMonth(today), monthsAgo);
  const monthInterval = { start: monthRef, end: today };
  return { weekInterval, monthInterval };
}
