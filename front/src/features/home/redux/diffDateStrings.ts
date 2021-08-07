/**
 * Given to dates as ISO strings return the difference between them
 * or 0 if the second date is not defined.
 * Can be used to calculate durations
 * @param {string} start
 * @param {string} [ end ]
 * @return {number}
 */
export function diffDateStrings(start: any, end: any) {
  if (!end) return 0;
  const a = new Date(start);
  const b = new Date(end);
  return b.getTime() - a.getTime();
}
