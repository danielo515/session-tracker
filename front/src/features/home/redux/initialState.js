const initialState = {
  /** @type { import("@types").Session |null }*/
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
  editing: false,
  sessionBeingEdited: '',
  selectedRow: '',
};

export default initialState;
