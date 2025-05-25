import { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@redux/store';
import { ErrorBoundary } from '@utils/errorBoundary';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseAuth';
import { getStoredUser } from '@services/authStorage';
import { setUser } from '@redux/slices/authSlice';

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
