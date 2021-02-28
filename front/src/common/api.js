// @ts-check

import firebase from '../fb';

const provider = new firebase.auth.GoogleAuthProvider();

export function isUserLoggedIn() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged((user, error) => {
      if (error) {
        console.error('Failed cheking logged user', error);
        return resolve(null);
      }
      resolve(user);
    });
  });
}
export const login = ({ email, password }) => {};

export const googleLogin = () =>
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(({ credential, user }) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.toJSON();
      // The signed-in user info.
      return {
        error: null,
        response: {
          token,
          user,
        },
      };
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      return {
        response: null,
        error: {
          data: errorMessage,
          status: errorCode,
          email,
          credential,
        },
      };
    });

export const signUp = ({ email, password, name }) => {};

/**
 * @typedef { {response: any, error?: {status: number}} } apiResponse
 */
/**
 * @typedef { { error?: {status: number}} } errorResponse
 */

/**
 * Injects the user namespace on database Reference to the provided handler
 * @template T
 * @template K
 * @param {(db: firebase.database.Reference, args: T) => K} handler
 * @returns { (args:T) => Promise<K|errorResponse> }
 */
const withDb = handler => async args => {
  const userId = firebase.auth()?.currentUser?.uid;
  if (!userId) return { error: { status: 401 } };
  const db = firebase
    .database()
    .ref('/tasks')
    .child(userId);
  return handler(db, args);
};

export const listSessions = withDb(db => {
  return db
    .orderByKey()
    .get()
    .then(snapshot => {
      if (snapshot.exists()) return { response: Object.values(snapshot.val()).reverse() };
      return { response: [] };
    });
});

/** @type { (args: Function) => void }*/
export const syncData = withDb(async (db, cb) => {
  const last = await db
    .orderByKey()
    .limitToLast(1)
    .once('child_added');
  db.orderByKey()
    .startAfter(last.key)
    .on('child_added', snapshot => {
      if (snapshot.exists()) return cb(snapshot.val());
    });
});

/**
 * @type { (args: {name: string}) => apiResponse }
 */
export const startSession = withDb((db, { name }) => {
  const newSessionRef = db.push();
  const session = { name, startDate: new Date().toISOString(), id: newSessionRef.key };
  return newSessionRef.set(session).then(() => ({ response: session }));
});
/** @type { (args: {id: string, name: string}) => apiResponse }*/
export const stopSession = withDb((db, { id, name }) => {
  const session = { name, endDate: new Date().toISOString() };
  db.child(id).update(session);
  return db
    .child(id)
    .once('value')
    .then(snap => ({ response: snap.val() }));
});
/** @type { (args: {id: string, name: string, startDate: Date, endDate: Date}) => apiResponse }*/
export const updateSession = withDb((db, { id, name, startDate, endDate }) => {
  return db
    .child(id)
    .set({ name, startDate, endDate })
    .then(() => ({ response: { id, name, startDate, endDate } }));
});

export const deleteSession = withDb((db, { id }) => {
  return db.child(id).set(null);
});
