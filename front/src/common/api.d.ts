import { SessionDefinition } from '@types';
import firebase from 'firebase';
export type errorResponse = {
  error: { status: number };
  response: null;
};

export type WithDb<T, K> = (
  handler: (db: firebase.database.Reference, args: T) => K,
) => (args: T) => Promise<K | errorResponse>;

export type createSessionDefinition = ReturnType<WithDb<SessionDefinition, any>>;
