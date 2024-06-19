import CustomButton from "@/components/CustomButton";
import Input from "@/components/Input";
import { Colors } from "@/constants/Colors";
import { Flahscard } from "@/models/Flashcard";
import { Folder } from "@/models/Folder";
import { Quiz } from "@/models/Quiz";
import { QuizOption } from "@/models/QuizOptions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function novoJogo() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const params = useLocalSearchParams();

    const [gameType, setGameType] = useState<string | null>(null);
    const [folderModalVisible, setFolderModalVisible] = useState<boolean>(false);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<Folder>();

    const [quizModalVisible, setQuizModalVisible] = useState<boolean>(false);
    const [quizQuestion, setQuizQuestion] = useState<string>('');
    const [quizOptions, setQuizOptions] = useState<{ id: number, description: string }[]>([
        { id: 1, description: '' },
        { id: 2, description: '' },
        { id: 3, description: '' },
        { id: 4, description: '' }
    ]);

    const [flashcardModalVisible, setFlashcardModalVisible] = useState<boolean>(false);
    const [flashcardFront, setFlashcardFront] = useState<string>('');
    const [flashcardBack, setFlahscardBack] = useState<string>('');

    const [selectedQuizOptionId, setSelectedQuizOptionId] = useState<number>();
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

    const handleOptionSelect = (index: number, quizOptionId: number) => {
        setSelectedQuizOptionId(quizOptionId);
        if (selectedOptionIndex === index) {
            setSelectedOptionIndex(null);
        } else {
            setSelectedOptionIndex(index);
        }
    };

    const getFolderName = async () => {
        try {
            const id = await AsyncStorage.getItem('folder-name');
            return id;
        } catch (e) {
            console.error("Error reading value", e);
            return null;
        }
    };

    const getFolderId = async () => {
        try {
            const id = await AsyncStorage.getItem('folder-id');
            return id;
        } catch (e) {
            console.error("Error reading value", e);
            return null;
        }
    };

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                allFolders();

                if (params.id) {
                    const folderId = await getFolderId();

                    if (folderId == undefined) {
                        throw new Error('Folder not found');
                    }

                    getFolder(folderId);
                }
            };

            fetchData();
        }, [])
    );

    const allFolders = () => {
        axios.get(apiUrl + '/folder')
            .then(response => {
                console.log('Folders: ', response.data);
                setFolders(response.data);
            })
            .catch(error => {
                console.error('Error fetching folders: ', error);
            });
    };

    const getFolder = (folderId: number | string) => {
        axios.get(apiUrl + '/folder/' + folderId)
            .then(response => {
                console.log('folder: ', response.data);
                setSelectedFolder(response.data);
            })
            .catch(error => {
                console.error('Error loading flashcard: ', error);
            });
    }

    const handleGameTypeSelect = (type: string) => {
        setGameType(type === gameType ? null : type);
    };

    const createGame = () => {
        if (gameType === 'flashcard') {
            setFlashcardModalVisible(true);
            handleNewFlashcard;
        } else if (gameType === 'quiz') {
            setQuizModalVisible(true);
        }
    };

    const handleFolderSelect = (folder: Folder) => {
        setSelectedFolder(folder);
        setFolderModalVisible(false);
    };

    const handleNewFlashcard = () => {

        if (!flashcardFront.trim() || !flashcardBack.trim()) {
            Alert.alert('Erro', 'Todos os campos precisam ser preenchidos.');
            return;
        }
        if (!selectedFolder) {
            Alert.alert('Erro', 'Uma pasta deve ser selecionada');
            return;
        }

        if (selectedFolder == undefined) {
            throw new Error('Folder not found');
        }

        if (selectedFolder == undefined) {
            throw new Error('Folder not found');
        }

        const flashcadData: Flahscard = {
            front: flashcardFront,
            back: flashcardBack,
            folder: selectedFolder
        };

        axios.post(apiUrl + '/flashcard', flashcadData)
            .then(response => {
                console.log('Flahscard created: ', response.data);
                setFlashcardModalVisible(false);
                Alert.alert('Sucesso', 'Flashcard criado com sucesso!');
            })
            .catch(error => {
                console.error('Error creating flashcard: ', error);
            });
    }

    const handleNewQuiz = () => {

        if (!quizQuestion.trim() || quizOptions.some(option => !option.description.trim()) || !selectedQuizOptionId == null) {
            Alert.alert('Erro', 'Todos os campos precisam ser preenchidos e uma resposta correta deve ser selecionada');
            return;
        }

        if (!selectedFolder) {
            Alert.alert('Erro', 'Uma pasta deve ser selecionada');
            return;
        }

        if (selectedFolder == undefined) {
            throw new Error('Folder not found');
        }

        const QuizData: Quiz = {
            question: quizQuestion,
            folder: selectedFolder,
        };

        axios.post(apiUrl + '/quiz', QuizData)
            .then(response => {
                console.log('Quiz created: ', response.data);

                const createdQuiz: Quiz = {
                    id: response.data.id,
                    question: response.data.question,
                    folder: response.data.folder
                }

                quizOptions.forEach(quizOption => {
                    const QuizOptionData: QuizOption = {
                        description: quizOption.description,
                        quiz: createdQuiz,
                        correctAnswer: selectedQuizOptionId === quizOption.id
                    }

                    axios.post(apiUrl + '/quizOptions', QuizOptionData)
                        .then(response => {
                            console.log('Quiz option created: ', response.data);
                            setQuizModalVisible(false);
                            Alert.alert('Sucesso', 'Quiz criado com sucesso!');
                        })
                        .catch(error => {
                            console.error('Error creating quiz option: ', error);
                            Alert.alert('Erro', 'Erro ao criar opção de quiz.');
                        });
                });

                setQuizModalVisible(false);
                Alert.alert('Sucesso', 'Quiz criado com sucesso!');
            })
            .catch(error => {
                console.error('Error creating quiz: ', error);
            });
    }

    const handleInputChange = (index: number, text: string) => {
        const newQuizOptions = [...quizOptions];
        newQuizOptions[index].description = text;
        setQuizOptions(newQuizOptions);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Selecione o jogo que deseja criar</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.gameTypeButton,
                        styles.flashcardButton,
                        gameType === 'flashcard' && styles.gameTypeButtonSelected,
                    ]}
                    onPress={() => handleGameTypeSelect('flashcard')}
                >
                    <Text style={styles.gameTypeText}>FLASHCARD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.gameTypeButton,
                        styles.quizButton,
                        gameType === 'quiz' && styles.gameTypeButtonSelected,
                    ]}
                    onPress={() => handleGameTypeSelect('quiz')}
                >
                    <Text style={styles.gameTypeText}>QUIZ</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Selecione uma pasta:</Text>
                <TouchableOpacity onPress={() => setFolderModalVisible(true)} style={styles.folderInput}>
                    <Text>{selectedFolder?.description || 'Selecionar...'}</Text>
                </TouchableOpacity>
            </View>

            <CustomButton
                title="CRIAR"
                color={Colors.rosaEscuro}
                onPress={createGame}
            />

            <Modal
                visible={folderModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFolderModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecionar Pasta</Text>
                        <FlatList
                            data={folders}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => handleFolderSelect(item)} style={styles.folderItem}>
                                        <Text>{item.description}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.folderList}
                        />
                        <TouchableOpacity style={styles.buttonCancelar} onPress={() => setFolderModalVisible(false)}>
                            <Text style={styles.buttonCancelarText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={flashcardModalVisible}
                onRequestClose={() => setFlashcardModalVisible(false)}
            >
                <SafeAreaView onTouchStart={() => setFlashcardModalVisible(false)}>
                </SafeAreaView>

                <View style={styles.overlay}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.inputView}>
                                <Input
                                    label="Frente"
                                    value={flashcardFront}
                                    onChangeText={text => setFlashcardFront(text)}
                                    secureTextEntry={false}
                                />
                                <Input
                                    label="Verso"
                                    value={flashcardBack}
                                    onChangeText={text => setFlahscardBack(text)}
                                    secureTextEntry={false}
                                />
                            </View>
                            <CustomButton
                                title="CRIAR"
                                color={Colors.verdeAgua}
                                onPress={handleNewFlashcard}
                            />
                            <CustomButton
                                title="CANCELAR"
                                color={Colors.vermelho}
                                onPress={() => setFlashcardModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={quizModalVisible}
                onRequestClose={() => setQuizModalVisible(false)}
            >
                <SafeAreaView onTouchStart={() => setQuizModalVisible(false)}>
                </SafeAreaView>

                <View style={styles.overlay}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.inputView}>
                                <Input
                                    label="Pergunta"
                                    value={quizQuestion}
                                    onChangeText={text => setQuizQuestion(text)}
                                    secureTextEntry={false}
                                />

                                {quizOptions.map((option, index) => (

                                    <View key={index} style={styles.optionContainer}>
                                        <TouchableOpacity
                                            style={styles.checkbox}
                                            onPress={() => handleOptionSelect(index, option.id)}
                                        >
                                            {selectedOptionIndex === index && (
                                                <View style={styles.checkedCircle} />
                                            )}
                                        </TouchableOpacity>

                                        <Input
                                            label="Resposta"
                                            value={option.description}
                                            onChangeText={text => handleInputChange(index, text)}
                                            secureTextEntry={false}
                                            style={styles.input}
                                        />
                                    </View>
                                ))}
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <CustomButton
                                    title="CRIAR"
                                    color={Colors.verdeAgua}
                                    onPress={handleNewQuiz}
                                />
                            </View>

                            <CustomButton
                                title="CANCELAR"
                                color={Colors.vermelho}
                                onPress={() => setQuizModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: Colors.rosaClaro,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        color: Colors.roxoAzulado,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center',
    },
    gameTypeButton: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    flashcardButton: {
        backgroundColor: Colors.verdeAgua,
    },
    quizButton: {
        backgroundColor: Colors.azul,
    },
    gameTypeButtonSelected: {
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    gameTypeText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'flex-start',
    },
    inputLabel: {
        marginBottom: 5,
        color: Colors.roxoAzulado,
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#f5d1c8',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    inputWhite: {
        backgroundColor: '#ffffff',
    },
    folderInput: {
        height: 50,
        width: '100%',
        borderColor: '#f5d1c8',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    folderItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f5a894',
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    folderItemText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFB5A7',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.roxoAzulado,
    },
    folderList: {
        marginBottom: 20,
        flexGrow: 0,
    },
    buttonCriar: {
        backgroundColor: '#f5a894',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonCriarText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonCancelar: {
        backgroundColor: Colors.rosaEscuro,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonCancelarText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
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
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.roxoAzulado,
        marginRight: 0,
        marginTop: 6,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    checkedCircle: {
        width: 16,
        height: 16,
        borderRadius: 7,
        backgroundColor: Colors.roxoAzulado,
    },
});