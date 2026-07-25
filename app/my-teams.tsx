import { StyleSheet, Text, View } from 'react-native';

export default function MyTeamsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Teams</Text>
      <Text style={styles.subtitle}>Your saved teams will appear here.</Text>
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
});