import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithCredential,
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
  return cred.user;
};

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password).then((c) => c.user);

export const loginWithGoogle = (idToken: string, accessToken: string) => {
  const cred = GoogleAuthProvider.credential(idToken, accessToken);
  return signInWithCredential(auth, cred).then(({ user }) => user);
};

export const logoutUser = () => signOut(auth);
