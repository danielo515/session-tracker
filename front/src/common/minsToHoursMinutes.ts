/**
 * convert minutes into hours:minutes format
 */
function minsToHoursMinutes(minutes: number) {
  const hours = (minutes / 60) | 0;
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
}

/**
 * convert milliseconds into hours:minutes format
 */
export function msToHoursMinutes(ms: number) {
  return minsToHoursMinutes(Math.floor(ms / 60000));
}

export default minsToHoursMinutes;
