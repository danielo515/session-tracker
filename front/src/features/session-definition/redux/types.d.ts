import initialState from './initialState.js';
import { Merge } from 'type-fest';
import { SessionDefinition } from '@types';
type InitialState = typeof initialState;
type state = {
  byName: Record<string, SessionDefinition>;
};
export type State = Merge<InitialState, state>;

export type Reducer = (state: State, action: any) => State;
