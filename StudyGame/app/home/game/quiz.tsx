import { Quiz } from '@/models/Quiz';
import { QuizOption } from '@/models/QuizOptions';
import { User } from '@/models/User';
import { UserPoints } from '@/models/UserPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const QuizScreen = () => {
    const params = useLocalSearchParams();

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [quiz, setQuiz] = useState<Quiz>();
    const [quizOptions, setQuizOptions] = useState<QuizOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    const [userPoints, setUserPoints] = useState<UserPoints>();

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                loadQuiz();
            };

            fetchData();
        }, [])
    );

    const handleOptionPress = (option: QuizOption | undefined) => {
        if (option != undefined) {
            setSelectedOption(option);
            setConfirmed(false);
        }
    };

    const handleConfirmPress = () => {
        setConfirmed(true);
    };

    const loadQuiz = () => {
        axios.get(apiUrl + '/quiz/' + params.id)
            .then(response => {
                console.log('Quiz: ', response.data);
                setQuiz(response.data);

                axios.get(apiUrl + '/quizOptions/quiz/' + params.id)
                    .then(response => {
                        console.log('Quiz Options: ', response.data);
                        setQuizOptions(response.data);
                    })
                    .catch(error => {
                        console.error('Error loading quiz: ', error);
                    });
            })
            .catch(error => {
                console.error('Error loading quiz: ', error);
            });
    }

    const getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('currently-user');
            return jsonValue != null ? JSON.parse(jsonValue) as User : null;
        } catch (e) {
            console.error("Error reading value", e);
            return null;
        }
    };


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
                <Text style={styles.quizTitle}>Quiz</Text>
                <Text style={styles.subject}>{quiz?.folder.description}</Text>
                <Text style={styles.question}>
                    {quiz?.question}
                </Text>

                <TouchableOpacity
                    style={[styles.optionButton, selectedOption === quizOptions[0] && styles.selectedOption, styles.shadow]}
                    onPress={() => handleOptionPress(quizOptions[0])}
                >
                    <Text style={styles.optionText}>{quizOptions[0]?.description}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.optionButton, selectedOption === quizOptions[1] && styles.selectedOption, styles.shadow]}
                    onPress={() => handleOptionPress(quizOptions[1])}
                >
                    <Text style={styles.optionText}>{quizOptions[1]?.description}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.optionButton, selectedOption === quizOptions[2] && styles.selectedOption, styles.shadow]}
                    onPress={() => handleOptionPress(quizOptions[2])}
                >
                    <Text style={styles.optionText}>{quizOptions[2]?.description}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.optionButton, selectedOption === quizOptions[3] && styles.selectedOption, styles.shadow]}
                    onPress={() => handleOptionPress(quizOptions[3])}
                >
                    <Text style={styles.optionText}>{quizOptions[3]?.description}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.confirmButton, styles.shadow]} onPress={handleConfirmPress}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>

                {confirmed && selectedOption && (
                    <>
                        <Text
                            style={[
                                styles.feedbackText,
                                selectedOption.correctAnswer === true ? styles.correctText : styles.incorrectText,
                            ]}
                        >
                            {selectedOption.correctAnswer === true ? 'Certa resposta!' : 'Resposta errada.'}
                        </Text>

                        {selectedOption.correctAnswer === true ? (
                            <View style={styles.difficultyButtons}>
                                <TouchableOpacity
                                    style={[styles.difficultyButton, styles.easyButton, styles.shadow]}
                                    onPress={() => postUserPoint('easy')}
                                >
                                    <Text style={styles.difficultyButtonText}>FÁCIL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.difficultyButton, styles.hardButton, styles.shadow]}
                                    onPress={() => postUserPoint('hard')}
                                >
                                    <Text style={styles.difficultyButtonText}>DIFÍCIL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.difficultyButton, styles.guessButton, styles.shadow]}
                                    onPress={() => postUserPoint('guess')}
                                >
                                    <Text style={styles.difficultyButtonText}>CHUTE</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.difficultyButtons}>
                                <TouchableOpacity
                                    style={[styles.difficultyButton, styles.hardButton, styles.shadow]}
                                    onPress={() => postUserPoint('wrong')}
                                >
                                    <Text style={styles.difficultyButtonText}>ERREI</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f7c6b1',
    },
    container: {
        flex: 1,
    },
    quizTitle: {
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
    question: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#455f8f',
    },
    optionButton: {
        backgroundColor: '#ffb5a7',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    selectedOption: {
        backgroundColor: '#f28482',
    },
    optionText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#455f8f',
    },
    confirmButton: {
        backgroundColor: '#5fd98e',
        padding: 15,
        borderRadius: 5,
        marginVertical: 20,
    },
    confirmButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
    },
    feedbackText: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    correctText: {
        color: 'green',
    },
    incorrectText: {
        color: 'red',
    },
    difficultyButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    difficultyButton: {
        padding: 15,
        borderRadius: 5,
        width: '30%',
        alignItems: 'center',
    },
    easyButton: {
        backgroundColor: '#5fd98e',
    },
    hardButton: {
        backgroundColor: '#f28482',
    },
    guessButton: {
        backgroundColor: '#809bce',
    },
    difficultyButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default QuizScreen;