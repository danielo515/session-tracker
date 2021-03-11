/** @param {number} minutes */
export const formatMinutes4Human = minutes => {
  if (minutes < 60) return `${minutes} minutes`;
  const hours = (minutes / 60) | 0;
  const remaining = minutes % 60;
  const hourStr = hours > 1 ? 'hours' : 'hour';
  return `${hours} ${hourStr} ${remaining} min`;
};
