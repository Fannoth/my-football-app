import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'cachedUser';

export const storeUser = async (user: { uid: string; email: string }) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getStoredUser = async (): Promise<{ uid: string; email: string } | null> => {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearStoredUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
