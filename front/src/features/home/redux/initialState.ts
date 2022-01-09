import { Session } from '@types';

const initialState = {
  runningSession: null as Session | null,
  startSessionPending: false,
  startSessionError: null,
  stopSessionPending: false,
  stopSessionError: null as string | null,
  fetchSessionsPending: false,
  fetchSessionsError: null,
  sessions: [] as Session[],
  deleteSessionPending: false,
  deleteSessionError: null,
  switchTaskPending: false,
  switchTaskError: null,
  updateSessionPending: false,
  updateSessionError: null as string | null,
  editing: false,
  sessionBeingEdited: '',
  selectedRow: '',
};

export default initialState;

export type State = typeof initialState;
