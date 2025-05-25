import { useEffect } from 'react';
import { Text, StyleSheet, ScrollView, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTopLeagues } from '@redux/slices/leaguesSlice';
import { RootState, AppDispatch } from '@redux/store';
import { Stack, useRouter } from 'expo-router';

import LeagueCard from '@components/LeagueCard';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { leagues, loading, error } = useSelector((state: RootState) => state.leagues);
  const router = useRouter();
  useEffect(() => {
    dispatch(getTopLeagues());
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerRight: () => (
            <Button title="Ustawienia" onPress={() => router.push('/settings')} color="#FF6F00" />
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Top 5 Lig </Text>

        {loading && <ActivityIndicator size="large" color="#FF6F00" />}
        {error && <Text style={styles.error}>{error}</Text>}

        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 24,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});
