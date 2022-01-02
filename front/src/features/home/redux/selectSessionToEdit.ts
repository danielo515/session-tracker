/** @typedef {import("@types").Session} Session*/

import { createSelector } from 'reselect';
import selectSessions from './selectSessions';

/**
 *
 * @param {Session[]} sessions
 * @param {string} sessionId
 * @returns {Session|void}
 */
function selectSessionToEdit(sessions, sessionId) {
  if (!sessionId) {
    return;
  }
  const session = sessions.find(({ id }) => id === sessionId);
  // if (!session) throw new Error('Trying to edit non existing session');
  return session;
}

export default createSelector(
  selectSessions,
  ({ home }) => home.sessionBeingEdited,
  selectSessionToEdit,
);
