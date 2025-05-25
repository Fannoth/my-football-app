import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

import PlayerCard from '@components/PlayerCard';

export default function PlayerDetailsScreen() {
  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const { team } = useSelector((state: RootState) => state.players);

  const player = team?.squad.find((p: any) => p.id.toString() === playerId);

  if (!player) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Nie znaleziono zawodnika.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PlayerCard key={player.id} player={player} />
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
  infoBox: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B0BEC5',
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
