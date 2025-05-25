import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { setUser } from '@redux/slices/authSlice';
import { loginWithEmail, loginWithGoogle } from '@services/firebaseAuth';

import * as Google from 'expo-auth-session/providers/google';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'project-76214080862.apps.googleusercontent.com',
    iosClientId: 'project-76214080862.apps.googleusercontent.com',
    androidClientId: 'project-76214080862.apps.googleusercontent.com',
    webClientId: 'project-76214080862.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success' && response.authentication) {
      handleGoogleLogin(response.authentication.idToken!, response.authentication.accessToken!);
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      const user = await loginWithEmail(email, password);
      dispatch(setUser({ email: user.email, uid: user.uid }));
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Błąd logowania', error.message);
    }
  };

  const handleGoogleLogin = async (idToken: string, accessToken: string) => {
    try {
      const user = await loginWithGoogle(idToken, accessToken);
      dispatch(setUser({ email: user.email, uid: user.uid }));
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Błąd Google Sign-In', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Hasło"
        style={styles.input}
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Zaloguj się e-mailem" onPress={handleLogin} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Zaloguj się przez Google" onPress={() => promptAsync()} disabled={!request} />
      <Text style={styles.registerLink} onPress={() => router.push('/register')}>
        Nie masz konta? Zarejestruj się
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  registerLink: {
    color: '#00C853',
    marginTop: 16,
    textAlign: 'center',
  },
});
