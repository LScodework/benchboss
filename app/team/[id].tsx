import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TeamScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [team, setTeam] = useState<any>(null);

    useEffect(() => {
        const loadTeam = async () => {
            const savedTeams = await AsyncStorage.getItem('teams');
            const teams = savedTeams ? JSON.parse(savedTeams) : [];
            const selectedTeam = teams.find((item: any) => item.id === id);

            setTeam(selectedTeam);
        };

        loadTeam();
    }, [id]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {team ? `${team.name} Dashboard` : 'Team Dashboard'}
            </Text>

            <Pressable
                style={styles.managePlayersButton}
                onPress={() =>
                    router.push({
                        pathname: '/team/players',
                        params: { id: String(id) },
                    })
                }
            >
                <Text style={styles.managePlayersButtonText}>Manage Players</Text>
            </Pressable>

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

    managePlayersButton: {
        width: '100%',
        maxWidth: 400,
        marginTop: 28,
        paddingVertical: 16,
        alignItems: 'center',
        backgroundColor: '#EF4444',
        borderRadius: 12,
    },

    managePlayersButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});