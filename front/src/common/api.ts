import { RunningSession, Session, SessionDefinition } from '@types';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';
import {
  child,
  DatabaseReference,
  get,
  limitToLast,
  onChildAdded,
  onChildChanged,
  onValue,
  orderByKey,
  push,
  query,
  set,
  startAfter,
  update,
  Query,
  DataSnapshot,
} from 'firebase/database';
import { withDb } from './api-types';

const provider = new GoogleAuthProvider();

const auth = getAuth();

export function isUserLoggedIn() {
  return new Promise<User | null>((resolve) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
      },
      (error) => {
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
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const { user } = result;
      const credential = GoogleAuthProvider.credentialFromResult(result);
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
    .catch((error) => {
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

export const signUp = (args: { email: string; password: string; name: string }): any => {
  console.log('Not used anymore');
};

export const listSessions = withDb((db) => {
  const allQuery = query(child(db, 'all'), orderByKey());
  return Promise.all([get(allQuery), get(child(db, 'runningSession'))]).then(
    ([snapshot, currentSnap]) => {
      if (snapshot.exists())
        return {
          error: null,
          response: { all: Object.values(snapshot.val()).reverse(), current: currentSnap.val() },
        };
      return { error: null, response: { all: [], current: currentSnap.val() } };
    },
  );
});
type sessionCb = (args: Session) => any;
type sessionCbNull = (args: Session | null) => any;
type SyncArgs = {
  onSessionAdded: sessionCb;
  onRunningUpdate: sessionCbNull;
  onSessionUpdate: sessionCb;
};

const childOnce = (query: Query) => {
  return new Promise<DataSnapshot>((resolve) => {
    onChildAdded(
      query,
      (snapshot) => {
        resolve(snapshot);
      },
      { onlyOnce: true },
    );
  });
};

export const syncData = withDb<SyncArgs, never>(
  async (db, { onSessionAdded, onRunningUpdate, onSessionUpdate }) => {
    const all = child(db, 'all');
    const last = await childOnce(query(all, orderByKey(), limitToLast(1)));
    const addedQuery = query(all, orderByKey(), startAfter(last.key));
    onChildAdded(addedQuery, (snapshot) => {
      console.log('Child added', snapshot.key);
      if (snapshot.exists()) return onSessionAdded(snapshot.val());
    });
    onChildChanged(all, (snap) => {
      if (snap.exists() && snap.val().id) onSessionUpdate(snap.val());
    });
    onValue(child(db, 'runningSession'), (snapshot) => {
      return onRunningUpdate(snapshot.val());
    });
  },
);

const setValue = <T>(db: DatabaseReference, path: string, value: T) => {
  const ref = child(db, path);
  return set(ref, value);
};
const pushValue = <T>(db: DatabaseReference, path: string, value: T) => {
  const ref = child(db, path);
  return push(ref, value);
};

export const startSession = withDb<{ name: string }, RunningSession>((db, { name }) => {
  const session = { name, startDate: new Date().toISOString() };
  return setValue(db, 'runningSession', session).then(() => ({ response: session, error: null }));
});

export const stopSession = withDb(async (db) => {
  const running = child(db, 'runningSession');
  const runningSnap = await get(running);
  if (!runningSnap.exists()) {
    throw new Error('Stopping not existing session');
  }
  const pushRef = await push(child(db, 'all'));
  const session = { ...runningSnap.val(), id: pushRef.key, endDate: new Date().toISOString() };
  await set(running, null);
  await set(pushRef, session);
  return { response: session, error: null };
});

export const updateSession = withDb<Session, Session>((db, { id, name, startDate, endDate }) => {
  const target = child(db, 'all/' + id);
  return update(target, { name, startDate, endDate }).then(() => ({
    response: { id, name, startDate, endDate },
    error: null,
  }));
});

type UpdateInfo = { name: string; startDate: Date };

export const updateRunningSession = withDb<UpdateInfo, UpdateInfo>((db, { name, startDate }) => {
  return setValue(db, 'runningSession', { name, startDate: startDate.toISOString() }).then(() => ({
    response: { name, startDate },
    error: null,
  }));
});

type DeleteInfo = { id: string };

export const deleteSession = withDb<DeleteInfo, DeleteInfo>((db, { id }) => {
  return setValue(db, 'all/' + id, null)
    .then(() => ({ response: { id }, error: null }))
    .catch((error) => ({ error, response: null }));
});

export const createSessionDefinition = withDb<SessionDefinition, SessionDefinition>(
  (db, sessionDefinition) => {
    return pushValue(db, 'sessionDefinitions', sessionDefinition)
      .then(() => ({ response: sessionDefinition, error: null }))
      .catch((error) => ({ error, response: null }));
  },
);

export const listDefinitions = withDb<undefined, SessionDefinition[]>((db) => {
  const definitionsQuery = query(child(db, 'sessionDefinitions'), orderByKey());
  const result = get(definitionsQuery).then((snapshot) => {
    if (snapshot.exists())
      return {
        error: null,
        response: Object.values(snapshot.val()) as SessionDefinition[],
      };
    return { error: null, response: [] };
  });
  return result;
});
