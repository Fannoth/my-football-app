import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    logo: string;
  };
}

export default function TeamCard({ team }: TeamCardProps) {
  const router = useRouter();

  return (
    <Pressable
      testID="team-card"
      style={styles.card}
      onPress={() => router.push(`/team/${team.id}`)}
    >
      <Image
        testID="team-logo"
        accessibilityLabel={`Logo ${team.name}`}
        source={{ uri: team.logo }}
        style={styles.logo}
      />
      <Text style={styles.name}>{team.name}</Text>
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
  name: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
