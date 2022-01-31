import firebase from 'fb';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
export const auth = getAuth(firebase);

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
