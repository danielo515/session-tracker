import { formatMinutes4Human } from './formatMinutes4Human';
import format from 'date-fns/format';
import differenceInMinutes from 'date-fns/differenceInMinutes';

type DateCompatible = Date | string | number;

/**
 * Returns the diff between two dates in an human readable format
 * @param {DateCompatible} start
 * @param {DateCompatible} end
 */
export const formatDateDiff = (start: DateCompatible, end: DateCompatible) =>
  formatMinutes4Human(differenceInMinutes(new Date(end), new Date(start)));

const formatStart = 'yyy-MM-dd HH:mm';

/**
 * Formats startdate including hours and minutes
 * @param {DateCompatible} date
 */
export function formatStartDate(date: DateCompatible) {
  return format(new Date(date), formatStart);
}
/**
 * Convert milliseconds to a human readable format with hours and minutes
 * @param {number} ms milliseconds
 */
export function msToHuman(ms: number) {
  return formatMinutes4Human(ms / 60000);
}
