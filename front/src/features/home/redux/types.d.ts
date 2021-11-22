import initialState from './initialState.js';
import { Session, RunningSession } from 'types';
import { Merge } from 'type-fest';
type InitialState = typeof initialState;
type state = {
  sessions: Session[];
  runningSession: void | RunningSession;
  sessionsById: { [id: string]: Session };
};
export type State = Merge<InitialState, state>;

export type Reducer = (state: State, action: any) => State;
