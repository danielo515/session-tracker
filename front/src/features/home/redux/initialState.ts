import { RunningSession, Session } from '@types';

type Nullable<T> = T | null;

const initialState = {
  runningSession: null as RunningSession | null,
  startSessionPending: false,
  startSessionError: null as Nullable<string>,
  stopSessionPending: false,
  stopSessionError: null as string | null,
  fetchSessionsPending: false,
  fetchSessionsError: null as Nullable<string>,
  sessions: [] as Session[],
  deleteSessionPending: false,
  deleteSessionError: null as Nullable<string>,
  switchTaskPending: false,
  switchTaskError: null as Nullable<string>,
  updateSessionPending: false,
  updateSessionError: null as string | null,
  editing: false,
  sessionBeingEdited: '',
  selectedRow: '',
};

export default initialState;

export type State = typeof initialState;
