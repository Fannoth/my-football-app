import { useRouter } from 'expo-router';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

interface LeagueCardProps {
  league: {
    id: number;
    name: string;
    logo: string;
    country: string;
  };
}

export default function LeagueCard({ league }: LeagueCardProps) {
  const router = useRouter();

  return (
    <Pressable
      testID="league-card"
      style={styles.card}
      onPress={() => router.push(`/league/${league.id}`)}
    >
      <Image testID="league-logo" source={{ uri: league.logo }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={styles.name}>{league.name}</Text>
        <Text style={styles.country}>{league.country}</Text>
      </View>
    </Pressable>
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
  logo: {
    width: 40,
    height: 40,
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
  country: {
    fontSize: 14,
    color: '#B0BEC5',
  },
});
