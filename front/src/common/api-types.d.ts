import firebase from 'firebase';
export type errorResponse = {
  error: { status: number };
  response: null;
};
export type apiResponse<K> = { error: null; response: K };

export type WithDb = <T, K>(
  handler: (db: firebase.database.Reference, args: T) => Promise<apiResponse<K>>,
) => (args: T) => Promise<apiResponse<K> | errorResponse>;
