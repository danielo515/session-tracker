import selectSessions from 'features/home/redux/selectSessions';
import { createSelector } from 'reselect';
import { getInitialValue, getSessionStatsReducer, Stats } from './selectRunningSessionStats';
import { Session } from 'types';

function getNameFromProps(_: unknown, name?: string) {
  return name;
}

function selectSessionStatsByName(sessions: Session[], sessionName?: string): Stats {
  const initialStats = getInitialValue();
  if (!sessionName) return initialStats;
  return sessions.reduce(getSessionStatsReducer(sessionName), initialStats);
}

export default createSelector(selectSessions, getNameFromProps, selectSessionStatsByName);
