import firebase from 'fb';
import { getAuth } from 'firebase/auth';
import { getDatabase, DatabaseReference, ref, connectDatabaseEmulator } from 'firebase/database';

const database = getDatabase(firebase);
const auth = getAuth(firebase);

if (location.hostname === 'localhost') {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(database, 'localhost', 9000);
}

export type ErrorResponse = {
  error: { status: number };
  response: null;
};
export type apiResponse<K> = { error: null; response: K } | ErrorResponse;

export function withDbSync<ApiArgs>(
  handler: (db: DatabaseReference, args: ApiArgs) => void,
): (args: ApiArgs) => Promise<ErrorResponse | void> {
  return async (args: ApiArgs) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return { error: { status: 401 }, response: null };
    const db = ref(database, '/tasks/' + userId);
    return handler(db, args);
  };
}

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

export function withDbList<Resp>(
  handler: (db: DatabaseReference) => Promise<apiResponse<Resp>>,
): () => Promise<apiResponse<Resp>> {
  //@ts-expect-error I don't know how to type this
  return withDb<never, Resp[]>(handler);
}
