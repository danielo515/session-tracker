// @ts-check

import axios from 'axios';
import firebase from 'firebase';
import { isCloseToExpire } from './isTokenExpired';

const provider = new firebase.auth.GoogleAuthProvider();

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  useAuth: true,
});

const refreshToken = fn => async args => {
  if (!args.token || !isCloseToExpire(args.token)) return fn(args);
  api
    .post('refreshToken', {}, { headers: { Authorization: `Bearer ${args.token}` } })
    .then(({ data: { token } }) => localStorage.setItem('token', token))
    .catch(err => console.error('Failed updating token: ', err));

  return fn(args);
};

const formatError = ({ response, request }) => ({
  error: { data: response.data, status: request.status },
});
const formatResponse = ({ data }) => ({ response: data });

export const login = ({ email, password }) =>
  api
    .post('login', { email, password })
    .then(formatResponse)
    .catch(formatError);

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

export const signUp = ({ email, password, name }) =>
  api
    .post('users', { email, password, name })
    .then(formatResponse)
    .catch(formatError);

export const me = ({ token }) =>
  api
    .get('me', { headers: { Authorization: `Bearer ${token}` } })
    .then(formatResponse)
    .catch(formatError);

const getDb = userId => {
  return firebase
    .database()
    .ref('/tasks')
    .child(userId);
};

export const listSessions = () => {
  const userId = firebase.auth()?.currentUser?.uid;
  if (!userId) return { response: [], error: { status: 401 } };
  const db = getDb(userId);
  return db.get().then(snapshot => {
    if (snapshot.exists()) return { response: Object.values(snapshot.val()) };
    return db.set([]).then(() => ({ response: [] }));
  });
};

export const startSession = ({ name }) => {
  const userId = firebase.auth()?.currentUser?.uid;
  if (!userId) return { response: [], error: { status: 401 } };
  const db = getDb(userId);
  const session = { name, startDate: new Date().toISOString() };
  return db
    .child(name)
    .set(session)
    .then(() => ({ response: session }));
};

// export const startSession = refreshToken(({ token, name }) =>
//   api
//     .post(
//       '/sessions',
//       { name, startDate: new Date().toISOString() },
//       { headers: { Authorization: `Bearer ${token}` } },
//     )
//     .then(formatResponse)
//     .catch(formatError),
// );
export const stopSession = ({ id, name }) => {
  const userId = firebase.auth()?.currentUser?.uid;
  if (!userId) return { response: [], error: { status: 401 } };
  const db = getDb(userId);
  const session = { name, endDate: new Date().toISOString() };
  return db
    .child(name)
    .update(session)
    .then(() => ({ response: session }));
};

// export const stopSession = ({ token, id, name }) =>
//   api
//     .patch(
//       `/sessions/${id}`,
//       { name, endDate: new Date().toISOString() },
//       { headers: { Authorization: `Bearer ${token}` } },
//     )
//     .then(formatResponse)
//     .catch(formatError);

export const updateSession = ({ token, id, name, startDate, endDate }) =>
  api
    .patch(
      `/sessions/${id}`,
      { name, endDate, startDate },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    .then(formatResponse)
    .catch(formatError);

export const deleteSession = ({ token, id }) =>
  api
    .delete(`/sessions/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(formatResponse)
    .catch(formatError);
