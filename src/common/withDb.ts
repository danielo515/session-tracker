import firebase from 'fb';
import { getAuth } from 'firebase/auth';
import { getDatabase, DatabaseReference, ref } from 'firebase/database';

const database = getDatabase(firebase);
const auth = getAuth(firebase);

export type ErrorResponse = {
  error: { status: number };
  response: null;
};
export type apiResponse<K> = { error: null; response: K } | ErrorResponse;

export function withDb<Response>(
  handler: (db: DatabaseReference) => Promise<Response>,
): () => Response;

export function withDb<ApiArgs, Resp = void>(
  handler: (db: DatabaseReference, args: ApiArgs) => Promise<Resp>,
): (args: ApiArgs) => Promise<Resp>;

export function withDb<ApiArgs, Resp>(
  handler: (db: DatabaseReference, args: ApiArgs) => Promise<apiResponse<Resp>>,
): (args: ApiArgs) => Promise<apiResponse<Resp>> {
  return async (args: ApiArgs) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return { error: { status: 401 }, response: null };
    const db = ref(database, '/tasks/' + userId);
    return handler(db, args);
  };
}
