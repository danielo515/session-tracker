const initialState = {
  runningSession: null,
  startSessionPending: false,
  startSessionError: null,
  stopSessionPending: false,
  stopSessionError: null,
  fetchSessionsPending: false,
  fetchSessionsError: null,
  sessions: [],
  deleteSessionPending: false,
  deleteSessionError: null,
  switchTaskPending: false,
  switchTaskError: null,
};

export default initialState;
