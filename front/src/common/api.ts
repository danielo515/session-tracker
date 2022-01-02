// @ts-check

/** @typedef {import('@types').Session} Session*/
/** @typedef {import('@types').SessionDefinition}  SessionDefinition*/
import firebase from '../fb';

const provider = new firebase.auth.GoogleAuthProvider();

export function isUserLoggedIn() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(
      user => {
        resolve(user);
      },
      error => {
        console.error('Failed checking logged user', error);
        return resolve(null);
      },
    );
  });
}

/**
 * @param {{ email: string, password: string}} args
 */
export function login({ email, password }: { email: string; password: string; }) {
  return { error: null, response: null };
}

export const googleLogin = () =>
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(({ credential, user }) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential && credential.toJSON();
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

/**
 * @param {{ email: string, password: string, name: string}} args
 */
export const signUp = ({ email, password, name }: { email: string; password: string; name: string; }) => {};

/** @type { import('./api-types').WithDb } */
const withDb = handler => async args => {
  const userId = firebase.auth()?.currentUser?.uid;
  if (!userId) return { error: { status: 401 }, response: null };
  const db = firebase
    .database()
    .ref('/tasks')
    .child(userId);
  return handler(db, args);
};

export const listSessions = withDb(db => {
  return Promise.all([
    db
      .child('all')
      .orderByKey()
      .get(),
    db.child('runningSession').get(),
  ]).then(([snapshot, currentSnap]) => {
    if (snapshot.exists())
      return {
        error: null,
        response: { all: Object.values(snapshot.val()).reverse(), current: currentSnap.val() },
      };
    return { error: null, response: { all: [], current: currentSnap.val() } };
  });
});
/** @typedef { (args: Session) => any } sessionCb*/
/** @typedef { (args: Session|null) => any } sessionCbNull*/
/**
 * @type { (args:{ onSessionAdded: sessionCb,
 *                  onRunningUpdate: sessionCbNull,
 *                  onSessionUpdate: sessionCb }) => void }
 * */
export const syncData = withDb(async (db, { onSessionAdded, onRunningUpdate, onSessionUpdate }) => {
  const all = db.child('all');
  const last = await all
    .orderByKey()
    .limitToLast(1)
    .once('child_added');
  all
    .orderByKey()
    .startAfter(last.key)
    .on('child_added', snapshot => {
      if (snapshot.exists()) return onSessionAdded(snapshot.val());
    });
  all.on('child_changed', snap => {
    if (snap.exists() && snap.val().id) onSessionUpdate(snap.val());
  });
  db.child('runningSession').on('value', snapshot => {
    return onRunningUpdate(snapshot.val());
  });
});

export const startSession = withDb((db, { name }) => {
  const session = { name, startDate: new Date().toISOString() };
  return db
    .child('runningSession')
    .set(session)
    .then(() => ({ response: session, error: null }));
});

/** @type { () => Promise<apiResponse<Session>> }*/
export const stopSession = withDb(async db => {
  const running = db.child('runningSession');
  const runningSnap = await running.get();
  if (!runningSnap.exists()) {
    throw new Error('Stopping not existing session');
  }
  const push = await db.child('all').push();
  const session = { ...runningSnap.val(), id: (push).key, endDate: new Date().toISOString() };
  await running.set(null);
  await push.set(session);
  return { response: session, error: null };
});

/** @type { (args: {id: string, name: string, startDate: Date, endDate: Date}) => Promise<apiResponse> }*/
export const updateSession = withDb((db, { id, name, startDate, endDate }) => {
  return db
    .child('all')
    .child(id)
    .update({ name, startDate, endDate })
    .then(() => ({ response: { id, name, startDate, endDate }, error: null }));
});
/** @type { (args: {name: string, startDate: Date}) => Promise<apiResponse<Session>> }*/
export const updateRunningSession = withDb((db, { name, startDate }) => {
  return db
    .child('runningSession')
    .set({ name, startDate: startDate.toISOString() })
    .then(() => ({ response: { name, startDate }, error: null }));
});

export const deleteSession = withDb((db, { id }) => {
  return db
    .child('all')
    .child(id)
    .set(null)
    .then(() => ({ response: { id }, error: null }))
    .catch(error => ({ error, response: null }));
});

export const createSessionDefinition = withDb((
  /** @type { firebase.database.Reference } */ db,
  /** @type {import('@types').SessionDefinition}*/ sessionDefinition,
) => {
  return db
    .child('definitions')
    .push(sessionDefinition)
    .then(() => ({ response: sessionDefinition, error: null }))
    .catch(error => ({ error, response: null }));
});

export const listDefinitions = withDb(db => {
  /** @type { Promise<{ response: SessionDefinition[], error: null}> } */
  const result = db
    .child('definitions')
    .orderByKey()
    .get()
    .then(snapshot => {
      if (snapshot.exists())
        return {
          error: null,
          response: /** @type { SessionDefinition[] } */ Object.values(snapshot.val()),
        };
      return { error: null, response: [] };
    });
  return result;
});
