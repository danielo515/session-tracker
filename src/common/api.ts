import { RunningSession, Session, SessionDefinition, SessionDefinitionFromDb } from '@types';
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
import { withDb, withDbList, withDbSync } from './withDb';

export const listSessions = withDbList<{ all: Session[]; current: RunningSession }>((db) => {
  const allQuery = query(child(db, 'all'), orderByKey());
  return Promise.all([get(allQuery), get(child(db, 'runningSession'))]).then(
    ([snapshot, currentSnap]) => {
      if (snapshot.exists())
        return {
          error: null,
          response: {
            all: Object.values(snapshot.val()).reverse() as Session[],
            current: currentSnap.val(),
          },
        };
      return { error: null, response: { all: [] as Session[], current: currentSnap.val() } };
    },
  );
});

type sessionCb = (args: Session) => unknown;
type sessionCbNull = (args: Session | null) => unknown;
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

export const syncData = withDbSync<SyncArgs>(
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
  const pushRef = push(ref, value);
  return pushRef.then((snapshot) => {
    if (!snapshot.key) throw new Error('No key after push');
    return snapshot.key;
  });
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
  const session: Session = {
    ...runningSnap.val(),
    id: pushRef.key,
    endDate: new Date().toISOString(),
  };
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

export const createSessionDefinition = withDb<SessionDefinition, SessionDefinitionFromDb>(
  (db, sessionDefinition) => {
    return pushValue(db, 'definitions', sessionDefinition)
      .then((id) => ({ response: { id, ...sessionDefinition }, error: null }))
      .catch((error) => ({ error, response: null }));
  },
);

export const listDefinitions = withDbList((db) => {
  const definitionsQuery = query(child(db, 'definitions'), orderByKey());
  const result = get(definitionsQuery).then((snapshot) => {
    if (snapshot.exists()) {
      const definitionsCollection: { [id: string]: SessionDefinition } = snapshot.val();
      return {
        error: null,
        response: Object.entries(definitionsCollection).map(([id, definition]) => {
          return { ...definition, id };
        }),
      };
    }
    return { error: null, response: [] };
  });
  return result;
});

export const updateDefinition = withDb<SessionDefinitionFromDb, SessionDefinitionFromDb>(
  (db, { id, ...definition }) => {
    return setValue(db, 'definitions/' + id, definition).then(() => ({
      response: { id, ...definition },
      error: null,
    }));
  },
);
