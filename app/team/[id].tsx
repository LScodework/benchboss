import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TeamScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [team, setTeam] = useState<any>(null);
    const [roster, setRoster] = useState<any[]>([]);

    useEffect(() => {
        const loadTeam = async () => {
            const savedTeams = await AsyncStorage.getItem('teams');
            const teams = savedTeams ? JSON.parse(savedTeams) : [];
            const selectedTeam = teams.find((item: any) => item.id === id);

            setTeam(selectedTeam);
        };

        loadTeam();
    }, [id]);

    useEffect(() => {
        const loadPlayers = async () => {
            const savedPlayers = await AsyncStorage.getItem(`players-${id}`);
            setRoster(savedPlayers ? JSON.parse(savedPlayers) : []);
        };

        loadPlayers();
    }, [id]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {team ? `${team.name} Dashboard` : 'Team Dashboard'}
            </Text>

            <View style={styles.dashboard}>
                <View style={styles.sidebar}>
                    <Pressable
                        style={styles.actionButton}
                        onPress={() =>
                            router.push({
                                pathname: '/team/roster',
                                params: { id: String(id) },
                            })
                        }
                    >
                        <Text style={styles.actionButtonText}>Manage Players</Text>
                    </Pressable>

                    <Pressable style={styles.placeholderButton}>
                        <Text style={styles.placeholderButtonText}>Team Settings</Text>
                    </Pressable>

                    <Pressable style={styles.placeholderButton}>
                        <Text style={styles.placeholderButtonText}>Team Stats</Text>
                    </Pressable>
                </View>

                <View style={styles.rosterSection}>
                    <Pressable
                        style={styles.sectionHeader}
                        onPress={() =>
                            router.push({
                                pathname: '/team/roster',
                                params: { id: String(id) },
                            })
                        }
                    >
                        <Text style={styles.sectionHeaderText}>Roster</Text>
                    </Pressable>

                    {roster.length === 0 ? (
                        <Text style={styles.emptyText}>No players added yet.</Text>
                    ) : (
                        roster.map((player) => (
                            <Pressable
                                key={player.id}
                                style={({ pressed }) => [
                                    styles.playerCard,
                                    pressed && styles.playerCardPressed,
                                ]}
                                onPress={() =>
                                    router.push({
                                        pathname: '/team/player',
                                        params: {
                                            teamId: String(id),
                                            playerId: player.id,
                                        },
                                    })
                                }
                            >
                                <Text style={styles.playerName}>
                                    #{player.number} {player.name}
                                </Text>

                                <Text style={styles.playerPosition}>
                                    {player.positions || 'No position listed'}
                                </Text>
                            </Pressable>
                        ))
                    )}
                </View>

                <View style={styles.rightSection}>
                    <View style={styles.gamesRow}>
                        <View style={styles.gamePanel}>
                            <Text style={styles.panelTitle}>Recent Games</Text>
                            <Text style={styles.emptyText}>No recent games yet.</Text>
                        </View>

                        <View style={styles.gamePanel}>
                            <Text style={styles.panelTitle}>Upcoming Games</Text>
                            <Text style={styles.emptyText}>No upcoming games yet.</Text>
                        </View>
                    </View>

                    <View style={styles.notesPanel}>
                        <Text style={styles.panelTitle}>Team Goals / Notes</Text>
                        <Text style={styles.emptyText}>
                            Team notes will appear here.
                        </Text>
                    </View>
                </View>
            </View>
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
        marginBottom: 20,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EF4444',
    },

    dashboard: {
        flex: 1,
        flexDirection: 'row',
        gap: 16,
    },

    sidebar: {
        width: 190,
        gap: 12,
    },

    actionButton: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        backgroundColor: '#EF4444',
        borderRadius: 10,
    },

    actionButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    placeholderButton: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2B2B2B',
    },

    placeholderButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#2B2B2B',
    },

    rosterSection: {
        width: '30%',
        padding: 16,
        backgroundColor: '#F6F1E7',
        borderRadius: 12,
    },

    sectionHeader: {
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2B2B2B',
    },

    sectionHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2B2B2B',
    },

    rightSection: {
        flex: 1,
        gap: 16,
    },

    gamesRow: {
        flexDirection: 'row',
        gap: 16,
    },

    gamePanel: {
        flex: 1,
        minHeight: 190,
        padding: 16,
        backgroundColor: '#F6F1E7',
        borderRadius: 12,
    },

    notesPanel: {
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

    emptyText: {
        marginTop: 18,
        fontSize: 16,
        textAlign: 'center',
        color: '#6B7280',
    },

    playerCard: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },

    playerCardPressed: {
        opacity: 0.7,
    },

    playerName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#2B2B2B',
    },

    playerPosition: {
        marginTop: 3,
        fontSize: 14,
        color: '#6B7280',
    },
});