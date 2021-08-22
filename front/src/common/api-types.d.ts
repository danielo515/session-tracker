import { SessionDefinition } from '@types';
import firebase from 'firebase';
export type errorResponse = {
  error: { status: number };
  response: null;
};

export type WithDb<T, K> = (
  handler: (db: firebase.database.Reference, args: T) => K,
) => (args: T) => Promise<{ error: null; response: K } | errorResponse>;

export type CreateSessionDefinition = ReturnType<WithDb<SessionDefinition, any>>;
export type ListDefinitions = ReturnType<WithDb<void, SessionDefinition[]>>;
