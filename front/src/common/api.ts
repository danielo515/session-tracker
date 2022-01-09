import { Session, SessionDefinition } from '@types';
import firebase from '../fb';
import { WithDb } from './api-types';

const provider = new firebase.auth.GoogleAuthProvider();

export function isUserLoggedIn() {
  return new Promise<firebase.User | null>(resolve => {
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

export function login({ email, password }: { email: string; password: string }) {
  return { error: null, response: null };
}

export const googleLogin = () =>
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(({ credential, user }) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential && credential.toJSON();
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
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
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

export const signUp = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  console.log('Not used anymore');
};

const withDb: WithDb = handler => async args => {
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
type sessionCb = (args: Session) => any;
type sessionCbNull = (args: Session | null) => any;
type SyncArgs = {
  onSessionAdded: sessionCb;
  onRunningUpdate: sessionCbNull;
  onSessionUpdate: sessionCb;
};
export const syncData = withDb<SyncArgs, void>(
  async (db, { onSessionAdded, onRunningUpdate, onSessionUpdate }) => {
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
  },
);

export const startSession = withDb<{ name: string }, Omit<Session, 'id'>>((db, { name }) => {
  const session = { name, startDate: new Date().toISOString() };
  return db
    .child('runningSession')
    .set(session)
    .then(() => ({ response: session, error: null }));
});

export const stopSession = withDb(async db => {
  const running = db.child('runningSession');
  const runningSnap = await running.get();
  if (!runningSnap.exists()) {
    throw new Error('Stopping not existing session');
  }
  const push = await db.child('all').push();
  const session = { ...runningSnap.val(), id: push.key, endDate: new Date().toISOString() };
  await running.set(null);
  await push.set(session);
  return { response: session, error: null };
});

export const updateSession = withDb<Session, Session>((db, { id, name, startDate, endDate }) => {
  return db
    .child('all')
    .child(id)
    .update({ name, startDate, endDate })
    .then(() => ({ response: { id, name, startDate, endDate }, error: null }));
});

type UpdateInfo = { name: string; startDate: Date };

export const updateRunningSession = withDb<UpdateInfo, UpdateInfo>((db, { name, startDate }) => {
  return db
    .child('runningSession')
    .set({ name, startDate: startDate.toISOString() })
    .then(() => ({ response: { name, startDate }, error: null }));
});

type DeleteInfo = { id: string };

export const deleteSession = withDb<DeleteInfo, DeleteInfo>((db, { id }) => {
  return db
    .child('all')
    .child(id)
    .set(null)
    .then(() => ({ response: { id }, error: null }))
    .catch(error => ({ error, response: null }));
});

export const createSessionDefinition = withDb<SessionDefinition, SessionDefinition>(
  (db, sessionDefinition) => {
    return db
      .child('definitions')
      .push(sessionDefinition)
      .then(() => ({ response: sessionDefinition, error: null }))
      .catch(error => ({ error, response: null }));
  },
);

export const listDefinitions = withDb<undefined, SessionDefinition[]>(db => {
  const result = db
    .child('definitions')
    .orderByKey()
    .get()
    .then(snapshot => {
      if (snapshot.exists())
        return {
          error: null,
          response: Object.values(snapshot.val()) as SessionDefinition[],
        };
      return { error: null, response: [] };
    });
  return result;
});
