import { Session } from '@types';
import { createSelector } from 'reselect';
import selectRunningSession from './selectRunningSession';
import selectSessions from './selectSessions';

function selectAllSessions(sessions: Session[], runningSession: Session | null): Session[] {
  if (!runningSession) return sessions;
  return [...sessions, { ...runningSession, endDate: new Date().toISOString() }].reverse();
}

export default createSelector(selectSessions, selectRunningSession, selectAllSessions);
