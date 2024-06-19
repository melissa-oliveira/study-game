import { Flahscard } from '@/models/Flashcard';
import { User } from '@/models/User';
import { UserPoints } from '@/models/UserPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

const FlashcardScreen = () => {
    const params = useLocalSearchParams();

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [flashcard, setFlashcard] = useState<Flahscard>();
    const [flipped, setFlipped] = useState(false);

    const [userPoints, setUserPoints] = useState<UserPoints>();

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                loadFlashcard();
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

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    const loadFlashcard = () => {
        axios.get(apiUrl + '/flashcard/' + params.id)
            .then(response => {
                console.log('Flashcard: ', response.data);
                setFlashcard(response.data);
            })
            .catch(error => {
                console.error('Error loading flashcard: ', error);
            });
    }

    type PointType = 'wrong' | 'easy' | 'hard' | 'guess';

    const postUserPoint = async (type: PointType) => {

        const user = await getUser();

        if (!user) {
            throw new Error('User not found');
        }

        axios.get(apiUrl + '/userPoints/user/' + user.id)
            .then(response => {
                console.log('User Points: ', response.data);

                const userPoints = response.data;

                if (!userPoints) {
                    throw new Error('User not found');
                }

                if (type === 'wrong') {
                    userPoints.wrongQnt++;
                } else if (type === 'easy') {
                    userPoints.easyQnt++;
                } else if (type === 'hard') {
                    userPoints.hardQnt++;
                } else if (type === 'guess') {
                    userPoints.guessQnt++;
                }

                return axios.put(apiUrl + '/userPoints', userPoints);
            })
            .then(response => {
                console.log('User Points: ', response.data);
                setUserPoints(response.data);

                router.push({ pathname: "home/game/pasta" });
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Flashcard</Text>
                <Text style={styles.subject}>{flashcard?.folder.description}</Text>
                <View style={styles.card}>
                    <Image source={require('@/assets/images/flashcard.png')} style={styles.image} />
                    {!flipped ? (
                        <View style={styles.cardFrontContent}>
                            <Text style={styles.frontText}>
                                {flashcard?.front}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.cardBackContent}>
                            <Text style={styles.text}>
                                {flashcard?.back}
                            </Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleFlip}>
                    <Text style={styles.buttonText}>{!flipped ? 'VIRAR' : 'VOLTAR'}</Text>
                </TouchableOpacity>
                {flipped && (
                    <View style={styles.options}>
                        <View style={styles.optionRow}>
                            <TouchableOpacity style={[styles.wrongButton, styles.shadow]} onPress={() => { postUserPoint('wrong') }}>
                                <Text style={styles.buttonText}>ERREI</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.easyButton, styles.shadow]} onPress={() => { postUserPoint('easy') }}>
                                <Text style={styles.buttonText}>FÁCIL</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.optionRow}>
                            <TouchableOpacity style={[styles.hardButton, styles.shadow]} onPress={() => { postUserPoint('hard') }}>
                                <Text style={styles.buttonText}>DIFÍCIL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.guessButton, styles.shadow]} onPress={() => { postUserPoint('guess') }}>
                                <Text style={styles.buttonText}>CHUTE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#455f8f',
    },
    subject: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#d37361',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f7c6b1',
    },
    container: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    cardFrontContent: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBackContent: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    frontText: {
        fontSize: 24,
        textAlign: 'center',
        color: '#455f8f',
        padding: 10,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: '#455f8f',
        padding: 10,
    },
    button: {
        backgroundColor: '#5fd98e',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    options: {
        width: '100%',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    optionButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    wrongButton: {
        backgroundColor: '#ffd670',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    easyButton: {
        backgroundColor: '#5fd98e',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    hardButton: {
        backgroundColor: '#f28482',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    guessButton: {
        backgroundColor: '#809bce',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default FlashcardScreen;