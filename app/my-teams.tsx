import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function MyTeamsScreen() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const loadTeams = async () => {
      const savedTeams = await AsyncStorage.getItem('teams');
      setTeams(savedTeams ? JSON.parse(savedTeams) : []);
    };

    loadTeams();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Teams</Text>

      <Pressable
        style={({ pressed }) => [
          styles.createTeamButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.push('/create-team')}
      >
        <Text style={styles.createTeamButtonText}>Create New Team</Text>
      </Pressable>

      {teams.map((team: any) => {
        const initials = team.name
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((word: string) => word.charAt(0).toUpperCase())
          .join('');

        return (
          <Pressable
            key={team.id}
            style={styles.teamCard}
            onPress={() => router.push(`/team/${team.id}`)}
          >
            <View style={[styles.teamBadge, { backgroundColor: team.color }]}>
              <Text style={styles.teamBadgeText}>{initials}</Text>
            </View>

            <Text style={styles.teamName}>{team.name}</Text>
          </Pressable>
        );
      })}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#E8DCC4',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#EF4444',
  },

  subtitle: {
    marginTop: 12,
    fontSize: 18,
    color: '#2B2B2B',
  },

  teamCard: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },

  teamBadge: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },

  teamBadgeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  teamName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2B2B2B',
  },

  createTeamButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 12,
    zIndex: 1,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  createTeamButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});