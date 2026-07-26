import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function RecentGamesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Games</Text>

      <Text style={styles.subtitle}>
        Your completed games and game reviews will appear here.
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
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
    fontSize: 42,
    fontWeight: 'bold',
    color: '#EF4444',
  },

  subtitle: {
    maxWidth: 400,
    marginTop: 12,
    fontSize: 18,
    textAlign: 'center',
    color: '#2B2B2B',
  },

  button: {
    width: '100%',
    maxWidth: 400,
    marginTop: 28,
    paddingVertical: 16,
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
    color: '#FFFFFF',
  },
});