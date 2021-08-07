/** @param {number} minutes */
export const formatMinutes4Human = (minutes: any) => {
  if (minutes < 60) return `${Math.round(minutes)} minutes`;
  const hours = (minutes / 60) | 0;
  const remaining = Math.round(minutes % 60);
  const hourStr = hours > 1 ? 'hours' : 'hour';
  return `${hours} ${hourStr} ${remaining} min`;
};
