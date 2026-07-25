import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function CreateTeamScreen() {
  const [teamName, setTeamName] = useState('');
  const [teamColor, setTeamColor] = useState('#EF4444');

  const teamInitials = teamName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      Alert.alert('Team name required', 'Please enter a team name.');
      return;
    }

    const savedTeams = await AsyncStorage.getItem('teams');
    const teams = savedTeams ? JSON.parse(savedTeams) : [];

    const newTeam = {
      id: Date.now().toString(),
      name: teamName.trim(),
      color: teamColor,
    };

    await AsyncStorage.setItem('teams', JSON.stringify([...teams, newTeam]));

    Alert.alert('Team created!', teamName.trim());
    setTeamName('');
    setTeamColor('#EF4444');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Team</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter team name"
        value={teamName}
        onChangeText={setTeamName}
      />

      <View style={[styles.badge, { backgroundColor: teamColor }]}>
        <Text style={styles.badgeText}>
          {teamInitials || 'BB'}
        </Text>
      </View>

      <Text style={styles.colorLabel}>Choose team color</Text>

      <View style={styles.colorRow}>
        {['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#8B5CF6', '#111827'].map(
          (color) => (
            <Pressable
              key={color}
              onPress={() => setTeamColor(color)}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                teamColor === color && styles.selectedColor,
              ]}
            />
          )
        )}
      </View>

      <Pressable style={styles.createButton} onPress={handleCreateTeam}>
        <Text style={styles.createButtonText}>Create Team</Text>
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
    fontSize: 40,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
    color: '#2B2B2B',
  },

  input: {
    width: '100%',
    maxWidth: 400,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2B2B2B',
  },

  badge: {
    width: 96,
    height: 96,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  colorLabel: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
    color: '#2B2B2B',
  },

  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
  },

  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },

  selectedColor: {
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  createButton: {
    width: '100%',
    maxWidth: 400,
    marginTop: 32,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 12,
  },

  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});