import { SessionWithAllDates } from '@types';
import subMonths from 'date-fns/subMonths';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import isWithinInterval from 'date-fns/isWithinInterval';
import endOfDay from 'date-fns/endOfDay';

/**
 * Given a number of months ago selects the sessions of that day.
 */
export function selectRelativeMonthsSessions(sessions: SessionWithAllDates[], monthsAgo = 0) {
  const today = endOfDay(new Date());
  const monthRef = subMonths(startOfMonth(today), monthsAgo);
  const interval = { start: monthRef, end: endOfMonth(monthRef) };
  return sessions.filter(({ startDate }) => isWithinInterval(new Date(startDate), interval));
}
