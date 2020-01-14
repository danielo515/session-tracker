import differenceInMinutes from 'date-fns/differenceInMinutes';
// Generate Sales Data
export const createData = formatter => ({ name, startDate, endDate }) => {
  const duration = differenceInMinutes(new Date(endDate || Date.now()), new Date(startDate));
  const date = formatter(new Date(startDate));
  return { name, duration, startDate: date };
};
