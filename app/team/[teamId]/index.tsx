import { useEffect } from 'react';
import { Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@redux/store';
import { getTeamDetails } from '@redux/slices/playersSlice';
import PlayerCard from '@components/PlayerCard';

export default function TeamDetailsScreen() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { team, loading, error } = useSelector((state: RootState) => state.players);

  useEffect(() => {
    if (teamId) {
      dispatch(getTeamDetails(teamId));
    }
  }, [teamId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <ActivityIndicator color="#FF6F00" />}
      {error && <Text style={styles.error}>{error}</Text>}

      {team && (
        <>
          <Image source={{ uri: team.logo }} style={styles.logo} />
          <Text style={styles.title}>{team.name}</Text>

          <Text style={styles.sectionTitle}>Zawodnicy</Text>

          {team.squad.map((player: any) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6F00',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});
