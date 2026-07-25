import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BenchBoss</Text>
      <Text style={styles.tagline}>Track faster. Coach smarter.</Text>

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.primaryButtonPressed,
        ]}
        onPress={() => router.push('/create-team')}>
        <Text style={styles.primaryButtonText}>Create Team</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.secondaryButtonPressed,
        ]}
        onPress={() => router.push('/my-teams')}>
        <Text style={styles.secondaryButtonText}>My Teams</Text>
      </Pressable>
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
  primaryButton: {
    marginTop: 36,
    minWidth: 220,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#EF4444',
  },
  primaryButtonPressed: {
    opacity: 0.75,
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    marginTop: 16,
    minWidth: 220,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#EF4444',
  },
  secondaryButtonPressed: {
    opacity: 0.75,
  },
  secondaryButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});