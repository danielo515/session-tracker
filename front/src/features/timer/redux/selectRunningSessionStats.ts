import isWithinInterval from 'date-fns/fp/isWithinInterval';
import selectRunningSession from 'features/home/redux/selectRunningSession';
import selectSessions from 'features/home/redux/selectSessions';
import { createSelector } from 'reselect';
import { getTodayIntervals } from 'dateUtils/getIntervals';
import { calculateSessionDuration } from '@common/calculateSessionDuration';
import { Session } from '@types';

export type Stats = {
  today: number;
  todayCount: number;
  thisWeek: number;
  thisMonth: number;
  allTime: number;
  count: number;
};

export const getSessionStatsReducer = (sessionName: string) => {
  const { weekInterval, monthInterval, todayInterval } = getTodayIntervals();
  const isToday = isWithinInterval(todayInterval);
  const isThisWeek = isWithinInterval(weekInterval);
  const isThisMonth = isWithinInterval(monthInterval);
  return (acc: Stats, session: Session) => {
    if (session.name !== sessionName) {
      return acc;
    }
    const sessionDate = new Date(session.startDate);
    const sessionDuration = calculateSessionDuration(session);
    if (isToday(sessionDate)) {
      acc.today += sessionDuration;
      acc.todayCount += 1;
    }
    if (isThisWeek(sessionDate)) {
      acc.thisWeek += sessionDuration;
    }
    if (isThisMonth(sessionDate)) {
      acc.thisMonth += sessionDuration;
    }
    acc.allTime += sessionDuration;
    acc.count += 1;
    return acc;
  };
};

export const getInitialValue = (): Stats => ({
  today: 0,
  todayCount: 0,
  thisMonth: 0,
  thisWeek: 0,
  allTime: 0,
  count: 0,
});

/**
 * This selector is used to get the running session stats.
 * However, if you need real time updates (e.g. to also include the running session and update the UI),
 * this selector should not be used because it can experience caching issues.
 * For that it's better to use selectSessionStatsByName and sum the duration of the running session.
 */
function selectRunningSessionStats(sessions: Session[], runningSession: Session | null): Stats {
  const initialStats = getInitialValue();
  if (!runningSession) return initialStats;
  return [...sessions, { ...runningSession, endDate: new Date().toISOString() }].reduce(
    getSessionStatsReducer(runningSession.name),
    initialStats,
  );
}

export default createSelector(selectSessions, selectRunningSession, selectRunningSessionStats);
