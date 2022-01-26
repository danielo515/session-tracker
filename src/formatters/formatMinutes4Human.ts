export const formatMinutes4Human = (minutes: number, short = true) => {
  if (minutes < 60) return `${Math.round(minutes)} ${short ? 'min' : 'minutes'}`;
  const hours = (minutes / 60) | 0;
  const remaining = Math.round(minutes % 60);
  const hourStr = short ? 'h' : hours > 1 ? 'hours' : 'hour';
  return `${hours} ${hourStr} ${remaining} ${short ? 'm' : 'min'}`;
};
