import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { setUser } from '@redux/slices/authSlice';
import { registerWithEmail } from '@services/firebaseAuth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async () => {
    try {
      const user = await registerWithEmail(email, password);
      dispatch(setUser({ email: user.email, uid: user.uid }));
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Błąd rejestracji', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>
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
      <Button title="Zarejestruj się" onPress={handleRegister} />
      <Text style={styles.registerLink} onPress={() => router.push('/login')}>
        Masz już konto? Zaloguj się
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
