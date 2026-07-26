import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PlayerDashboardScreen() {
  const { teamId, playerId } = useLocalSearchParams();
  const router = useRouter();

  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const loadPlayer = async () => {
      const savedPlayers = await AsyncStorage.getItem(
        `players-${String(teamId)}`
      );

      const players = savedPlayers ? JSON.parse(savedPlayers) : [];

      const selectedPlayer = players.find(
        (item: any) => item.id === String(playerId)
      );

      setPlayer(selectedPlayer);
    };

    loadPlayer();
  }, [teamId, playerId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player Dashboard</Text>
  
      {player ? (
        <>
          <View style={styles.playerInfoPanel}>
            <Text style={styles.playerName}>
              #{player.number} {player.name}
            </Text>
  
            <View style={styles.playerDetailsRow}>
              <View style={styles.bioSection}>
                <Text style={styles.detailLabel}>Player Bio</Text>
                <Text style={styles.detailText}>
                  School year, age, height, and weight will appear here.
                </Text>
              </View>
  
              <View style={styles.positionSection}>
                <Text style={styles.detailLabel}>Position(s)</Text>
                <Text style={styles.detailText}>
                  {player.positions || 'No position listed'}
                </Text>
              </View>
  
              <View style={styles.statusSection}>
                <Text style={styles.detailLabel}>Current Status</Text>
                <Text style={styles.detailText}>
                  Starter or reserve status will appear here.
                </Text>
  
                <Text style={styles.detailText}>
                  Varsity or JV level will appear here.
                </Text>
              </View>
            </View>
          </View>
  
          <View style={styles.dashboardRow}>
            <View style={styles.seasonPanel}>
              <Text style={styles.panelTitle}>Season Stat Averages</Text>
  
              <View style={styles.currentSeasonCard}>
                <Text style={styles.cardTitle}>Current Season</Text>
                <Text style={styles.placeholderText}>
                  Games, minutes, points, rebounds, assists, shooting, and
                  other season averages will appear here.
                </Text>
              </View>
  
              <View style={styles.seasonCard}>
                <Text style={styles.cardTitle}>Previous Season</Text>
                <Text style={styles.placeholderText}>
                  Previous season averages will appear here.
                </Text>
              </View>
  
              <View style={styles.seasonCard}>
                <Text style={styles.cardTitle}>Earlier Season</Text>
                <Text style={styles.placeholderText}>
                  Earlier season averages will appear here.
                </Text>
              </View>
            </View>
  
            <View style={styles.recentGamesPanel}>
              <Text style={styles.panelTitle}>Recent Game Stats</Text>
  
              {[1, 2, 3, 4].map((gameNumber) => (
                <View key={gameNumber} style={styles.gameCard}>
                  <Text style={styles.cardTitle}>
                    Recent Game Performance
                  </Text>
  
                  <Text style={styles.placeholderText}>
                    Opponent, date, minutes, points, rebounds, assists, and
                    shooting will appear here.
                  </Text>
                </View>
              ))}
            </View>
          </View>
  
          <View style={styles.notesPanel}>
            <Text style={styles.panelTitle}>Player Notes / Goals</Text>
  
            <Text style={styles.placeholderText}>
              Coaching notes, development goals, and season objectives will
              appear here.
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading player...</Text>
      )}
  
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back to Team</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#E8DCC4',
    },
  
    title: {
      marginBottom: 16,
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#EF4444',
    },
  
    playerInfoPanel: {
      padding: 16,
      backgroundColor: '#F6F1E7',
      borderRadius: 12,
    },
  
    playerName: {
      paddingBottom: 12,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#2B2B2B',
      borderBottomWidth: 1,
      borderBottomColor: '#2B2B2B',
    },
  
    playerDetailsRow: {
      flexDirection: 'row',
      marginTop: 12,
    },
  
    bioSection: {
      flex: 1,
      paddingHorizontal: 12,
    },
  
    positionSection: {
      flex: 1,
      paddingHorizontal: 12,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#B7B0A3',
    },
  
    statusSection: {
      flex: 1.4,
      paddingHorizontal: 12,
    },
  
    detailLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#2B2B2B',
    },
  
    detailText: {
      marginTop: 6,
      fontSize: 14,
      lineHeight: 20,
      textAlign: 'center',
      color: '#6B7280',
    },
  
    dashboardRow: {
      flex: 1,
      flexDirection: 'row',
      gap: 16,
      marginTop: 16,
    },
  
    seasonPanel: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F6F1E7',
      borderRadius: 12,
    },
  
    recentGamesPanel: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F6F1E7',
      borderRadius: 12,
    },
  
    panelTitle: {
      paddingBottom: 10,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#2B2B2B',
      borderBottomWidth: 1,
      borderBottomColor: '#2B2B2B',
    },
  
    currentSeasonCard: {
      flex: 1.2,
      marginTop: 14,
      padding: 14,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
    },
  
    seasonCard: {
      flex: 1,
      marginTop: 12,
      padding: 14,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
    },
  
    gameCard: {
      flex: 1,
      marginTop: 12,
      padding: 12,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
    },
  
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
      color: '#2B2B2B',
    },
  
    placeholderText: {
      marginTop: 6,
      fontSize: 13,
      lineHeight: 18,
      textAlign: 'center',
      color: '#6B7280',
    },
  
    notesPanel: {
      minHeight: 150,
      marginTop: 16,
      padding: 16,
      backgroundColor: '#F6F1E7',
      borderRadius: 12,
    },
  
    loadingText: {
      marginTop: 24,
      fontSize: 18,
      textAlign: 'center',
      color: '#6B7280',
    },
  
    backButton: {
      marginTop: 16,
      paddingVertical: 12,
      alignItems: 'center',
      backgroundColor: '#EF4444',
      borderRadius: 10,
    },
  
    backButtonPressed: {
      opacity: 0.75,
    },
  
    backButtonText: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
  });