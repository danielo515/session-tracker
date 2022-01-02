/** @typedef {import("@types").Session} Session*/

/**
 * Calculates the session duration in milliseconds.
 * @param {Session} session
 * @returns {number}
 * */
export function calculateSessionDuration(session: Session) {
  const start = new Date(session.startDate);
  const end = new Date(session.endDate || new Date());
  const diff = end.getTime() - start.getTime();
  return diff;
}
