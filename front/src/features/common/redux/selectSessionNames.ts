import { Session } from '@types';
import { createSelector } from 'reselect';
import selectSessions from '../../home/redux/selectSessions';

function selectSessionsNames(sessions: Session[]) {
  return Array.from(new Set(sessions.map(({ name }) => name)));
}

export default createSelector(selectSessions, selectSessionsNames);
