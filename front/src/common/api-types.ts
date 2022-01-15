import firebase from 'firebase';
export type ErrorResponse = {
  error: { status: number };
  response: null;
};
export type apiResponse<K> = { error: null; response: K } | ErrorResponse;

export function withDb<Response>(
  handler: (db: firebase.database.Reference) => Promise<Response>,
): () => Response;

export function withDb<Args, _ extends never>(
  handler: (db: firebase.database.Reference, args: Args) => Promise<void>,
): (args: Args) => Promise<void>;

export function withDb<ApiArgs, Resp>(
  handler: (db: firebase.database.Reference, args: ApiArgs) => Promise<apiResponse<Resp>>,
): (args: ApiArgs) => Promise<apiResponse<Resp>>;

export function withDb(handler) {
  return async args => {
    const userId = firebase.auth()?.currentUser?.uid;
    if (!userId) return { error: { status: 401 }, response: null };
    const db = firebase
      .database()
      .ref('/tasks')
      .child(userId);
    return handler(db, args);
  };
}
