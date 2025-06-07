import { useEffect } from 'react';
import { getLeagueTable } from '@redux/slices/teamsSlice';
import { useLocalSearchParams } from 'expo-router';
import { RootState, AppDispatch } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import TeamCard from '@components/TeamCard';

export default function LeagueDetailsScreen() {
  const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { table, loading, error } = useSelector((state: RootState) => state.teams);

  useEffect(() => {
    if (leagueId) {
      dispatch(getLeagueTable(leagueId));
    }
  }, [leagueId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tabela Ligowa</Text>
      {loading && <ActivityIndicator color="#FF6F00" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {table.map((team) => (
        <TeamCard key={team.team.id} team={team.team} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 16,
    textAlign: 'center',
  },
  teamCard: {
    padding: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
