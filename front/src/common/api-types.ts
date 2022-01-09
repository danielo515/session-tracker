import firebase from 'firebase';
export type ErrorResponse = {
  error: { status: number };
  response: null;
};
export type apiResponse<K> = { error: null; response: K } | ErrorResponse;

export type WithDb = <ApiArgs, Resp>(
  handler: (db: firebase.database.Reference, args: ApiArgs) => Promise<apiResponse<Resp>>,
) => (args: ApiArgs) => Promise<apiResponse<Resp>>;
