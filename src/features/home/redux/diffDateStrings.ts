/**
 * Given to dates as ISO strings return the difference between them
 * or 0 if the second date is not defined.
 * Can be used to calculate durations.
 * The diff is in milliseconds.
 */
export function diffDateStrings(start: string, end?: string) {
  if (!end) return 0;
  const a = new Date(start);
  const b = new Date(end);
  return b.getTime() - a.getTime();
}
