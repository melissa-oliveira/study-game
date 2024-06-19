import React, { useState } from 'react';
import { StyleSheet, Image, Alert, KeyboardAvoidingView, Text, View } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '@/components/CustomButton';
import Input from '@/components/Input';
import { User } from '@/models/User';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Folder } from '@/models/Folder';
import { UserPoints } from '@/models/UserPoints';

export default function Autocadastro() {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ name: false, phone: false, email: false, password: false });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateInputs = () => {
        const newErrors = {
            name: !name.trim(),
            phone: !phone.trim(),
            email: !validateEmail(email),
            password: !password.trim()
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const createGeneralFolder = (user: User) => {
        const folderData: Folder = {
            description: 'Geral',
            user: user
        };
        axios.post(apiUrl + '/folder', folderData)
            .then(response => {
                console.log('Folder created: ', response.data);
            })
            .catch(error => {
                console.error('Error creating folder: ', error);
                Alert.alert('Erro', 'Erro ao criar a pasta Geral.');
            });
    };

    const createUserPoints = (user: User) => {
        const userPointsData: UserPoints = {
            wrongQnt: 0,
            easyQnt: 0,
            hardQnt: 0,
            guessQnt: 0,
            user: user
        };
        axios.post(apiUrl + '/userPoints', userPointsData)
            .then(response => {
                console.log('UserPoints created: ', response.data);
            })
            .catch(error => {
                console.error('Error creating user points: ', error);
                Alert.alert('Erro', 'Erro ao criar a os pontos de usuário.');
            });
    };

    const signUp = (data: User) => {
        axios.post(apiUrl + '/user', data)
            .then(response => {
                console.log('User created: ', response.data);
                const user = response.data;
                createGeneralFolder(user);
                createUserPoints(user);
                Alert.alert(
                    'Sucesso',
                    'Cadastro realizado com sucesso!'
                );
            })
            .catch(error => {
                console.error('Error creating user: ', error);
                Alert.alert('Erro', 'Erro ao realizar o cadastro.');
            });
    };

    const handleSignUp = () => {
        if (validateInputs()) {
            const userData: User = { name, phone, email, password };
            signUp(userData);
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image
                source={require('../assets/images/studygame_logo.png')}
                style={styles.logo}
            />
            <View style={styles.inputView}>
                <Input
                    label="Nome"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input
                    label="Telefone"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                />
                <Input
                    label="E-mail"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                />
                <Input
                    label="Senha"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <CustomButton
                title="Cadastrar"
                onPress={handleSignUp}
                color="#FFB5A7"
            />
            <Text style={styles.textSignUp}>
                Já possui uma conta?{' '}
                <Link
                    href='/login'
                    style={styles.linkSignUp}
                >Faça login</Link>
            </Text>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.rosaClaro,
    },
    logo: {
        width: 250,
        height: 150,
        marginBottom: 10,
        alignSelf: 'center',
    },
    inputView: {
        marginBottom: 15,
    },
    textSignUp: {
        textAlign: 'center',
        marginTop: 15,
        color: Colors.roxoAzulado,
        fontWeight: '600',
    },
    linkSignUp: {
        textDecorationLine: 'underline',
        color: Colors.vermelho,
    }
});

