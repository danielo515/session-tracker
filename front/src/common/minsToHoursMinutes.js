/**
 * convert minutes into hours:minutes format
 * @param {number} minutes
 */
function minsToHoursMinutes(minutes) {
  const hours = (minutes / 60) | 0;
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
}

/**
 * convert milliseconds into hours:minutes format
 * @param {number} ms
 */
export function msToHoursMinutes(ms) {
  return minsToHoursMinutes(Math.floor(ms / 60000));
}

export default minsToHoursMinutes;
