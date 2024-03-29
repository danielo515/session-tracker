import { Session } from '@types';

/**
 * Calculates the session duration in milliseconds.
 * */
export function calculateSessionDuration(session: {
  startDate: Session['startDate'];
  endDate?: Session['endDate'];
}): number {
  const start = new Date(session.startDate);
  const end = new Date(session.endDate || new Date());
  const diff = end.getTime() - start.getTime();
  return diff;
}
