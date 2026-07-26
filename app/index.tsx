import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [hasTeams, setHasTeams] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkForTeams = async () => {
        const savedTeams = await AsyncStorage.getItem('teams');
        const teams = savedTeams ? JSON.parse(savedTeams) : [];

        setHasTeams(teams.length > 0);
      };

      checkForTeams();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.profileButton}
        onPress={() => router.push('/account')}
      >
        <Text style={styles.profileButtonText}>👤</Text>
      </Pressable>

      <Text style={styles.title}>BenchBoss</Text>
      <Text style={styles.tagline}>Track faster. Coach smarter.</Text>

      {!hasTeams ? (
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push('/create-team')}
        >
          <Text style={styles.buttonText}>
            Create your first team to get started
          </Text>
        </Pressable>
      ) : (
        <View style={styles.buttonGroup}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() =>
              Alert.alert('Start Game', 'The game setup will be added later.')
            }
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/my-teams')}
          >
            <Text style={styles.buttonText}>My Teams</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() =>
              Alert.alert(
                'Recent Games',
                'Completed games will appear here later.'
              )
            }
          >
            <Text style={styles.buttonText}>Recent Games</Text>
          </Pressable>
        </View>
      )}
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

  profileButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
  },

  profileButtonText: {
    fontSize: 24,
  },

  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#EF4444',
  },

  tagline: {
    marginTop: 12,
    fontSize: 20,
    textAlign: 'center',
    color: '#2B2B2B',
  },

  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },

  primaryButton: {
    width: '100%',
    maxWidth: 400,
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 12,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});