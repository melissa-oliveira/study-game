import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from "@/constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { UserPoints } from '@/models/UserPoints';
import { User } from '@/models/User';
import { useFocusEffect } from 'expo-router';

export default function EstatisticasScreen() {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [userPoints, setUserPoints] = useState<UserPoints>();
    const [sumCorrectPoints, setSumCorrectoints] = useState<number>()

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                getUserPoints();
            };

            fetchData();
        }, [])
    );

    const getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('currently-user');
            return jsonValue != null ? JSON.parse(jsonValue) as User : null;
        } catch (e) {
            console.error("Error reading value", e);
            return null;
        }
    };

    const getUserPoints = async () => {

        const user = await getUser();

        if (!user) {
            throw new Error('User not found');
        }

        axios.get(apiUrl + '/userPoints/user/' + user.id)
            .then(response => {
                console.log('User Points: ', response.data);
                const userPointsData = response.data;

                if (!userPointsData) {
                    throw new Error('User not found');
                }

                setSumCorrectoints(userPointsData.easyQnt + userPointsData.hardQnt + userPointsData.guessQnt);
                setUserPoints(userPointsData)
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Acompanhe seu desempenho:</Text>
            <View style={styles.statsContainer}>
                <View style={styles.right}>
                    <Text style={styles.statText}>ACERTEI: {sumCorrectPoints}</Text>
                </View>
                <View style={styles.easy}>
                    <Text style={styles.statText}>FÁCIL: {userPoints?.easyQnt}</Text>
                </View>
                <View style={styles.hard}>
                    <Text style={styles.statText}>DIFÍCIL: {userPoints?.hardQnt}</Text>
                </View>
                <View style={styles.guess}>
                    <Text style={styles.statText}>CHUTE: {userPoints?.guessQnt}</Text>
                </View>
                <View style={styles.wrong}>
                    <Text style={styles.statText}>ERREI: {userPoints?.wrongQnt}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.rosaClaro,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.vermelho,
        paddingBottom: 35,
        paddingTop: 30,
    },
    statsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    right: {
        width: '100%',
        backgroundColor: Colors.rosaEscuro,
        padding: 15,
        borderRadius: 10,
        borderColor: Colors.rosaEscuro,
        borderWidth: 1,
        marginVertical: 10,
        marginTop: 0,
        alignItems: 'center',
    },
    easy: {
        width: '80%',
        backgroundColor: Colors.verdeAgua,
        padding: 15,
        borderRadius: 10,
        borderColor: Colors.verdeAgua,
        borderWidth: 1,
        marginVertical: 10,
        alignItems: 'center',
    },
    hard: {
        width: '80%',
        backgroundColor: Colors.vermelho,
        padding: 15,
        borderRadius: 10,
        borderColor: Colors.vermelho,
        borderWidth: 1,
        marginVertical: 10,
        alignItems: 'center',
    },
    guess: {
        width: '80%',
        backgroundColor: Colors.azul,
        padding: 15,
        borderRadius: 10,
        borderColor: Colors.azul,
        borderWidth: 1,
        marginVertical: 10,
        alignItems: 'center',
    },
    wrong: {
        width: '100%',
        backgroundColor: Colors.amarelo,
        padding: 15,
        borderRadius: 10,
        borderColor: Colors.amarelo,
        borderWidth: 1,
        marginVertical: 10,
        alignItems: 'center',
    },
    statText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});