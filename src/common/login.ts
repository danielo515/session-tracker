import firebase from 'fb';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();
const auth = getAuth(firebase);

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
      if (!credential) throw new Error('No credential');
      const token = credential.toJSON();
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

export const signUp = (args: { email: string; password: string; name: string }) => {
  console.log('Not used anymore', args);
};
