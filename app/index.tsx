import { useEffect } from 'react';
import { auth } from '../services/firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter, usePathname } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function IndexScreen() {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (path !== '/home') {
          router.replace('/home');
        }
      } else {
        if (path !== '/login') {
          router.replace('/register');
        }
      }
    });
    return unsub;
  }, [path]);

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
