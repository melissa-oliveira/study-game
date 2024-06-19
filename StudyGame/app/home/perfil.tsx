import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { User } from '@/models/User';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function PerfilScreen() {

    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [isEditing, setIsEditing] = useState(false)
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                loadUserData();
            };

            fetchData();
        }, [])
    );

    const storeUser = async (value: User) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('currently-user', jsonValue);
        } catch (e) {
            // saving error
        }
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

    const loadUserData = async () => {
        const user = await getUser();

        if (!user || user === null) {
            throw new Error('Error');
        }

        setUser(user);
    }

    const handlePasswordChange = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
            return;
        }
        if (currentPassword !== user.password) {
            Alert.alert('Erro', 'Senha atual incorreta.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Erro', 'As novas senhas não coincidem.');
            return;
        }

        user.password = newPassword;

        axios.put(apiUrl + '/user', user)
            .then(response => {
                setPasswordModalVisible(false);
                setUser(response.data);
                Alert.alert('Sucesso', 'Dados alterados com sucesso!');
                storeUser(user);
                loadUserData();
            })
            .catch(error => {
                console.error('Error changing user data: ', error);
            });

    };

    const handleDataChange = () => {
        if (!user.name || !user.email || !user.phone) {
            Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
            return;
        }

        axios.put(apiUrl + '/user', user)
            .then(response => {
                setIsEditing(false);
                setUser(response.data);
                Alert.alert('Sucesso', 'Dados alterados com sucesso!');
                storeUser(user);
                loadUserData();
            })
            .catch(error => {
                console.error('Error changing user data: ', error);
            });
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <>
                    <TextInput
                        placeholder='Nome'
                        style={styles.input}
                        value={user.name}
                        onChangeText={text => setUser({ ...user, name: text })}
                    />
                    <TextInput
                        placeholder='Email'
                        style={styles.input}
                        value={user.email}
                        onChangeText={text => setUser({ ...user, email: text })}
                    />
                    <TextInput
                        placeholder='Telefone'
                        style={styles.input}
                        value={user.phone}
                        onChangeText={text => setUser({ ...user, phone: text })}
                    />
                    <View style={{ marginBottom: 10, marginTop: 20 }}>
                        <CustomButton
                            title="CONFIRMAR"
                            color={Colors.verdeAgua}
                            onPress={handleDataChange}
                        />
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.text}>Nome: {user.name}</Text>
                    <Text style={styles.text}>Email: {user.email}</Text>
                    <Text style={styles.text}>Telefone: {user.phone}</Text>

                    <View style={{ marginBottom: 10, marginTop: 20 }}>
                        <CustomButton
                            title="ALTERAR DADOS"
                            color={Colors.rosaEscuro}
                            onPress={() => setIsEditing(true)}
                        />
                    </View>
                </>
            )}
            <View style={{ marginBottom: 10, marginTop: 20 }}>
            <CustomButton
                title="ALTERAR SENHA"
                color={Colors.rosaEscuro}
                onPress={() => setPasswordModalVisible(true)}
            />
            </View>
            <Modal
                visible={passwordModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setPasswordModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a senha atual"
                            value={currentPassword}
                            secureTextEntry
                            onChangeText={text => setCurrentPassword(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite nova senha"
                            value={newPassword}
                            secureTextEntry
                            onChangeText={text => setNewPassword(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirme nova senha"
                            value={confirmPassword}
                            secureTextEntry
                            onChangeText={text => setConfirmPassword(text)}
                        />
                        <View style={{ marginBottom: 10, marginTop: 20 }}>
                            <CustomButton
                                title="Confirmar"
                                color={Colors.verdeAgua}
                                onPress={handlePasswordChange}
                            />
                        </View>
                        <View style={{ marginBottom: 10, marginTop: 20 }}>
                        <CustomButton
                            title="Cancelar"
                            color={Colors.vermelho}
                            onPress={() => setPasswordModalVisible(false)}
                        />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.rosaClaro,
    },
    text: {
        fontSize: 18,
        marginVertical: 10,
        color: Colors.vermelho,
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderColor: Colors.rosaMedio,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: Colors.rosaMedio,
        borderRadius: 10,
        alignItems: 'center',
    },
});