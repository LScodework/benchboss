import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function PlayersScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [teamName, setTeamName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [playerNumber, setPlayerNumber] = useState('');
    const [playerPositions, setPlayerPositions] = useState('');
    const [roster, setRoster] = useState<any[]>([]);

    useEffect(() => {
        const loadTeam = async () => {
            const savedTeams = await AsyncStorage.getItem('teams');
            const teams = savedTeams ? JSON.parse(savedTeams) : [];
            const selectedTeam = teams.find(
                (team: any) => team.id === String(id)
            );

            setTeamName(selectedTeam?.name ?? '');
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

    const handleSavePlayer = async () => {
        if (!playerName.trim() || !playerNumber.trim()) {
            Alert.alert(
                'Missing player information',
                'Please enter a player name and jersey number.'
            );
            return;
        }

        const savedPlayers = await AsyncStorage.getItem(`players-${id}`);
        const players = savedPlayers ? JSON.parse(savedPlayers) : [];

        const newPlayer = {
            id: Date.now().toString(),
            name: playerName.trim(),
            number: playerNumber.trim(),
            positions: playerPositions.trim(),
        };

        await AsyncStorage.setItem(
            `players-${id}`,
            JSON.stringify([...players, newPlayer])
        );

        setRoster([...players, newPlayer]);
        setPlayerName('');
        setPlayerNumber('');
        setPlayerPositions('');
        setShowForm(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {teamName ? `${teamName} Roster` : 'Team Roster'}
            </Text>

            <Pressable
                style={styles.addPlayerButton}
                onPress={() => setShowForm(!showForm)}
            >
                <Text style={styles.addPlayerButtonText}>Add Player</Text>
            </Pressable>
            {showForm && (
                <View style={styles.playerForm}>
                    <TextInput
                        style={styles.input}
                        placeholder="Player name"
                        placeholderTextColor="#6B7280"
                        value={playerName}
                        onChangeText={setPlayerName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Jersey number"
                        placeholderTextColor="#6B7280"
                        value={playerNumber}
                        onChangeText={setPlayerNumber}
                        keyboardType="number-pad"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Position(s)"
                        placeholderTextColor="#6B7280"
                        value={playerPositions}
                        onChangeText={setPlayerPositions}
                    />

                    <Pressable style={styles.savePlayerButton} onPress={handleSavePlayer}>
                        <Text style={styles.savePlayerButtonText}>Save Player</Text>
                    </Pressable>
                </View>
            )}

            {roster.map((player) => (
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

                    <Text style={styles.playerPositions}>
                        {player.positions || 'No position listed'}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8DCC4',
    },

    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#EF4444',
    },

    addPlayerButton: {
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

    addPlayerButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    playerForm: {
        width: '100%',
        maxWidth: 400,
        marginTop: 20,
        gap: 12,
    },

    input: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2B2B2B',
    },

    savePlayerButton: {
        marginTop: 4,
        paddingVertical: 14,
        alignItems: 'center',
        backgroundColor: '#EF4444',
        borderRadius: 10,
    },

    savePlayerButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    playerCard: {
        width: '100%',
        maxWidth: 400,
        marginTop: 12,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },

    playerCardPressed: {
        opacity: 0.7,
    },

    playerName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2B2B2B',
    },

    playerPositions: {
        marginTop: 4,
        fontSize: 16,
        color: '#6B7280',
    },
});