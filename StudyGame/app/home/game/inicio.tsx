import CustomButton from '@/components/CustomButton';
import Input from '@/components/Input';
import { Colors } from '@/constants/Colors';
import { Folder } from '@/models/Folder';
import { User } from '@/models/User';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Inicio() {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [folders, setFolders] = useState<Folder[]>([]);
    const [folderModalVisible, setFolderModalVisible] = useState(false);
    const [folderDescription, setFolderDescription] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        allFolders();
    }, []);

    const storeFolderId = async (value: number) => {
        try {
            await AsyncStorage.setItem('folder-id', value.toString());
        } catch (e) {
            console.error('Error saving folder id:', e);
        }
    };

    const storeFolderName = async (value: string) => {
        try {
            await AsyncStorage.setItem('folder-name', value.toString());
        } catch (e) {
            console.error('Error saving folder name:', e);
        }
    };

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

    const getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('currently-user');
            return jsonValue != null ? JSON.parse(jsonValue) as User : null;
        } catch (e) {
            console.error("Error reading value", e);
            return null;
        }
    };

    const closeFolderModal = () => {
        setFolderModalVisible(false);
    };

    const handleNewFolder = async () => {
        const user = await getUser();

        if (!user) {
            throw new Error('User not found');
        }

        const folderData: Folder = {
            description: folderDescription,
            user: user
        };

        axios.post(apiUrl + '/folder', folderData)
            .then(response => {
                console.log('Folder created: ', response.data);
                allFolders();
            })
            .catch(error => {
                console.error('Error creating folder: ', error);
            });

        setFolderModalVisible(false);
        setFolderDescription('');
    }

    const handleDeleteFolder = (folderId: number) => {
        axios.delete(apiUrl + '/folder/' + folderId)
            .then(response => {
                console.log('Folder deleted: ', response.data);
                allFolders();
            })
            .catch(error => {
                console.error('Error deleting folder: ', error);
            });

    }

    const confirmDelete = (id: number) => {
        Alert.alert(
            'Confirmação de Exclusão',
            'Você tem certeza que deseja deletar esta pasta?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        if (id !== undefined) {
                            handleDeleteFolder(id);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleNewGame = () => {
        router.push({ pathname: "home/game/novoJogo" });
    }

    const openFolder = async (folder: Folder) => {
        if (!folder.id) {
            throw new Error('Error');
        }

        if (folder.id != 0) {
            await storeFolderId(folder.id);
            await storeFolderName(folder.description);
            router.push({ pathname: "home/game/pasta" });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title="CRIAR PASTA"
                    color={Colors.verdeAgua}
                    onPress={() => setFolderModalVisible(true)}
                />
                <CustomButton
                    title="CRIAR JOGO"
                    color={Colors.azul}
                    onPress={handleNewGame}
                />
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={folderModalVisible}
                onRequestClose={closeFolderModal}
            >
                <SafeAreaView onTouchStart={closeFolderModal}>
                </SafeAreaView>

                <View style={styles.overlay}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.inputView}>
                                <Input
                                    label="Nome da pasta"
                                    value={folderDescription}
                                    onChangeText={text => setFolderDescription(text)}
                                    secureTextEntry={false}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <CustomButton
                                    title="CRIAR PASTA"
                                    color={Colors.verdeAgua}
                                    onPress={handleNewFolder}
                                />
                            </View>

                            <CustomButton
                                title="CANCELAR"
                                color={Colors.vermelho}
                                onPress={() => setFolderModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>


            <Text style={styles.folderText}>Todas as pastas</Text>

            <FlatList
                data={folders}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity key={index} style={styles.folderContainer} onPress={() => openFolder(item)}>
                            <Text style={styles.folderName}>{item.description}</Text>
                            <View style={styles.actionsContainer}>
                                <TouchableOpacity onPress={() => {
                                    if (item.id !== undefined) {
                                        confirmDelete(item.id);
                                    }
                                }}>
                                    <Ionicons name='trash-outline' size={18} color={Colors.azul} />
                                </TouchableOpacity>
                            </View>
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
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    folderText: {
        color: Colors.vermelho,
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
        color: Colors.azul,
        fontSize: 16,
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
