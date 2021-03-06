import initialState from './initialState.js';
import { Session, RunningSession } from '../../../types';
import { Merge } from 'type-fest';
type InitialState = typeof initialState;
type state = {
  sessions: Session[];
  runningSession: void | RunningSession;
};
export type State = Merge<InitialState, state>;
