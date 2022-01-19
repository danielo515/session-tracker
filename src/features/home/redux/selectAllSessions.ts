import { RunningSession, Session, SessionWithAllDates } from '@types';
import { createSelector } from 'reselect';
import selectRunningSession from './selectRunningSession';
import selectSessions from './selectSessions';

function selectAllSessions(
  sessions: SessionWithAllDates[],
  runningSession: RunningSession | null,
): SessionWithAllDates[] {
  if (!runningSession) return sessions;
  return [...sessions, { ...runningSession, endDate: new Date().toISOString() }].reverse();
}

export default createSelector(selectSessions, selectRunningSession, selectAllSessions);
