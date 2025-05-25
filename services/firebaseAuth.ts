import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { storeUser, clearStoredUser } from './authStorage';
import { firebaseConfig } from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager({}),
  }),
});

export const registerWithEmail = async (email: string, password: string) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, {});
  await setDoc(doc(db, 'users', cred.user.uid), {
    email,
    createdAt: serverTimestamp(),
  });
  const user = { uid: cred.user.uid, email: cred.user.email! };
  await storeUser(user);
  return cred.user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const user = { uid: cred.user.uid, email: cred.user.email! };
  await storeUser(user);
  return cred.user;
};

export const loginWithGoogle = async (idToken: string, accessToken: string) => {
  const credential = GoogleAuthProvider.credential(idToken, accessToken);
  const { user } = await signInWithCredential(auth, credential);
  const u = { uid: user.uid, email: user.email! };
  await storeUser(u);
  return user;
};

export const logoutUser = async () => {
  await signOut(auth);
  await clearStoredUser();
};
