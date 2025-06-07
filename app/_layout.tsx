import { useState, useEffect } from 'react';
import { auth } from '../services/firebaseAuth';
import { store } from '@redux/store';
import { setUser } from '@redux/slices/authSlice';
import { getStoredUser } from '@services/authStorage';
import { ErrorBoundary } from '@utils/errorBoundary';
import { Stack, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { Provider, useDispatch } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AuthGate />
      </ErrorBoundary>
    </Provider>
  );
}

function AuthGate() {
  const [user, setLocalUser] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const cached = await getStoredUser();
      if (cached) {
        dispatch(setUser(cached));
        setLocalUser(cached);
        router.replace('/home');
        return;
      }

      const unsub = onAuthStateChanged(auth, (u) => {
        if (u) {
          const usr = { uid: u.uid, email: u.email! };
          dispatch(setUser(usr));
          setLocalUser(usr);
          router.replace('/home');
        } else {
          router.replace('/register');
        }
      });
      return unsub;
    })();
  }, []);

  if (!user) {
    return (
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="login" options={{ title: 'Logowanie' }} />
        <Stack.Screen name="register" options={{ title: 'Rejestracja' }} />
      </Stack>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Ustawienia',
        }}
      />
    </Stack>
  );
}
