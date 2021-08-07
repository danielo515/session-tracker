import { formatMinutes4Human } from './formatMinutes4Human';
import format from 'date-fns/format';
import differenceInMinutes from 'date-fns/differenceInMinutes';

/** @typedef {Date|string|number} DateCompatible*/

/**
 * Returns the diff between two dates in an human readable format
 * @param {DateCompatible} start
 * @param {DateCompatible} end
 */
export const formatDateDiff = (start: any, end: any) =>
  formatMinutes4Human(differenceInMinutes(new Date(end), new Date(start)));

const formatStart = 'yyy-MM-dd HH:mm';

/**
 * Formats startdate including hours and minutes
 * @param {DateCompatible} date
 */
export function formatStartDate(date: any) {
  return format(new Date(date), formatStart);
}
/**
 * Convert milliseconds to a human readable format with hours and minutes
 * @param {number} ms milliseconds
 */
export function msToHuman(ms: any) {
  return formatMinutes4Human(ms / 60000);
}
