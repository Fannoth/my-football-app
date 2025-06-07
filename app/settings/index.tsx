import { useState, useEffect } from 'react';
import { logout } from '@redux/slices/authSlice';
import { useRouter, Stack } from 'expo-router';
import { RootState, AppDispatch } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, Alert, SafeAreaView } from 'react-native';
import { CameraType, PermissionStatus, useCameraPermissions, CameraView } from 'expo-camera';

import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function SettingsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const scheduleTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Powiadomienie testowe 🔔',
        body: 'To jest testowe powiadomienie!',
        data: { testData: 'Hello from notification' },
      },
      trigger: { seconds: 0 } as Notifications.TimeIntervalTriggerInput,
    });
  };

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      return Alert.alert('Odmowa dostępu do lokalizacji');
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    Alert.alert(
      'Twoja lokalizacja',
      `Lat: ${coords.latitude.toFixed(6)}, Lon: ${coords.longitude.toFixed(6)}`,
    );
  };

  const requestPush = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Odmowa dostępu do powiadomień');
    }

    Alert.alert('Dostęp do powiadomień przyznany', 'Powiadomienie testowe zostanie wysłane!');

    await scheduleTestNotification();
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Otrzymano powiadomienie:', notification);
    });

    return () => subscription.remove();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Ustawienia',
          headerLeft: () => <Button title="◀︎ Wróć" onPress={() => router.back()} />,
        }}
      />

      <SafeAreaView style={styles.container}>
        {user && <Text style={styles.info}>Zalogowany jako: {user.email}</Text>}

        <View style={styles.button}>
          <Button title="Lokalizacja" onPress={requestLocation} />
        </View>

        <View style={styles.button}>
          <Button title="Powiadomienia" onPress={requestPush} />
        </View>

        <View style={styles.cameraContainer}>
          {permission?.status !== PermissionStatus.GRANTED ? (
            <Button title="Poproś o dostęp do kamery" onPress={requestPermission} />
          ) : (
            <>
              <CameraView style={styles.camera} facing={cameraType} />
              <View style={styles.controls}>
                <Button
                  title="Przełącz kamerę"
                  onPress={() => setCameraType((prev) => (prev === 'back' ? 'front' : 'back'))}
                />
              </View>
            </>
          )}
        </View>
        <View style={styles.button}>
          <Button title="Wyloguj" color="#FF3B30" onPress={handleLogout} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  info: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    marginVertical: 8,
  },
  cameraContainer: {
    flex: 1,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});
