import { Merge } from 'type-fest';
import initialState from './initialState';

type InitialState = {
  setupAppError: null | string;
};

export type AppState = Merge<typeof initialState, InitialState>;
