import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@redux/store';
import { getLeagueTable } from '@redux/slices/teamsSlice';
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

      {table.map((standing) => (
        <TeamCard key={standing.team.id} team={standing.team} />
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});
