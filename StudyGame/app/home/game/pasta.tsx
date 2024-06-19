import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/Colors';
import { Flahscard } from '@/models/Flashcard';
import { Quiz } from '@/models/Quiz';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Inicio() {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [flashcards, setFlashcards] = useState<Flahscard[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setFlashcards([]);
                setQuizzes([]);
                await Promise.all([allFlashcards(), allQuizes()]);
            };

            fetchData();
        }, [])
    );

    const getFolderId = async () => {
        try {
            const id = await AsyncStorage.getItem('folder-id');
            return id;
        } catch (e) {
            console.error("Error reading value", e);
            return null;
        }
    };

    const allFlashcards = async () => {
        try {
            const folderId = await getFolderId();

            if (!folderId) {
                setFlashcards([]);
                throw new Error('Erro: Folder ID não encontrado');
            }

            const response = await axios.get(`${apiUrl}/flashcard/folder/${folderId}`);
            setFlashcards(response.data);
        } catch (error) {
            setFlashcards([]);
        }
    };

    const allQuizes = async () => {
        try {
            const folderId = await getFolderId();

            if (!folderId) {
                setQuizzes([]);
                throw new Error('Erro: Folder ID não encontrado');
            }
            const response = await axios.get(`${apiUrl}/quiz/folder/${folderId}`);
            setQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
            setQuizzes([]);
        }
    };

    const handleNewGame = async () => {
        const folderId = await getFolderId();

        if (!folderId) {
            throw new Error('Erro: Folder ID não encontrado');
        }

        router.push({ pathname: "home/game/novoJogo", params: { id: folderId } });
    }

    const handlePlayQuiz = (quiz: Quiz) => {
        router.push({ pathname: "home/game/quiz", params: { id: quiz.id } });
    }

    const handlePlayFlahscard = (flashcard: Flahscard) => {
        router.push({ pathname: "home/game/flashcard", params: { id: flashcard.id } });
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {/* <CustomButton
                    title="JOGAR TUDO"
                    color={Colors.verdeAgua}
                    onPress={() => { }}
                /> */}
                <CustomButton
                    title="CRIAR JOGO"
                    color={Colors.azul}
                    onPress={handleNewGame}
                />
            </View>

            <Text style={styles.folderText}>Flashcards</Text>
            <FlatList
                data={flashcards}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity key={index} style={styles.folderContainer} onPress={() => handlePlayFlahscard(item)}>
                            <Text style={styles.folderName}>{item.front}</Text>
                        </TouchableOpacity >
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />

            <Text style={styles.folderText}>Quizzes</Text>
            <FlatList
                data={quizzes}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity key={index} style={styles.folderContainer} onPress={() => handlePlayQuiz(item)}>
                            <Text style={styles.folderName}>{item.question}</Text>
                        </TouchableOpacity >
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: Colors.rosaClaro,
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    folderText: {
        color: Colors.rosaEscuro,
        marginTop: 30,
        fontSize: 16,
        fontWeight: '500',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: Colors.rosaMedio,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        width: '80%',
    },
    inputView: {
        width: '100%',
        marginBottom: 10,
    },
    folderContainer: {
        backgroundColor: Colors.rosaMedio,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        marginTop: 15,
        borderRadius: 10,
    },
    folderName: {
        color: Colors.roxoAzulado,
        fontSize: 16,
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
