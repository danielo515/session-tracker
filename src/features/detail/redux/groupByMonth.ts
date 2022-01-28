import { SessionWithAllDates } from '@types';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

type Month = typeof monthNames[number];

export const groupByMonth = (sessions: SessionWithAllDates[]) => {
  const initial = {} as { [month in Month]: SessionWithAllDates[] };
  return sessions.reduce((result, session) => {
    const month = monthNames[new Date(session.startDate).getMonth()];
    result[month] = result[month] || [];
    result[month].push(session);
    return result;
  }, initial);
};
