import { View, Text, Image, StyleSheet } from 'react-native';

interface PlayerCardProps {
  player: {
    id: number;
    name: string;
    position: string;
    age: number;
    nationality: string;
    photo: string;
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <View style={styles.card}>
      <Image testID="player-photo" source={{ uri: player.photo }} style={styles.photo} />
      <View style={styles.info}>
        <Text style={styles.name}>{player.name}</Text>
        <Text style={styles.details}>
          {player.position} | {player.nationality} | {player.age} lat
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  details: {
    fontSize: 14,
    color: '#B0BEC5',
  },
});
