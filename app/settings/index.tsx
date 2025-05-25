import { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@redux/store';
import * as Location from 'expo-location';
import { CameraType, PermissionStatus, useCameraPermissions, CameraView } from 'expo-camera';
import * as Notifications from 'expo-notifications';
import { logout } from '@redux/slices/authSlice';
import { useRouter, Stack } from 'expo-router';

export default function SettingsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((s: RootState) => s.auth);
  const router = useRouter();

  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

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
    Alert.alert('Dostęp do powiadomień przyznany');
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

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
