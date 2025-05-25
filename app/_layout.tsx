// app/_layout.tsx

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { Tabs, Stack, useRouter } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { ErrorBoundary } from '@utils/errorBoundary';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseAuth';

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
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  // Pokazujemy loader dopóki nie wiemy, czy jest user czy nie
  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#121212',
        }}
      >
        <ActivityIndicator color="#FF6F00" />
      </View>
    );
  }

  // Jeśli nie ma usera – renderujemy Stack z login/register
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
