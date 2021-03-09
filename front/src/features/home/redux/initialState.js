const initialState = {
  runningSession: null,
  startSessionPending: false,
  startSessionError: null,
  stopSessionPending: false,
  stopSessionError: null,
  fetchSessionsPending: false,
  fetchSessionsError: null,
  /** @type { import("../../../types").Session[] }*/
  sessions: [],
  deleteSessionPending: false,
  deleteSessionError: null,
  switchTaskPending: false,
  switchTaskError: null,
  updateSessionPending: false,
  updateSessionError: null,
};

export default initialState;
