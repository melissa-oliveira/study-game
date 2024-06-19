import React from 'react';
import CustomButton from "@/components/CustomButton";
import Input from "@/components/Input";
import { Login } from "@/models/Login";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, KeyboardAvoidingView, View, Text } from "react-native";
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/models/User';

export default function LoginScreen() {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const storeUser = async (value: User) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('currently-user', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    const login = (data: Login) => {
        axios.post(apiUrl + '/login', data)
            .then(response => {
                const user = response.data;
                storeUser(user);
                router.replace('/home/game/inicio');
            })
            .catch(error => {
                console.error('Login error: ', error);
                if (error.response && error.response.status === 401) {
                    Alert.alert('Erro', 'Email ou senha incorretos.');
                } else {
                    Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
                }
            });
    };

    const handleLogin = () => {
        const loginData: Login = { email, password };
        login(loginData);
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image
                source={require('../assets/images/studygame_logo.png')}
                style={styles.logo}
            />
            <View style={styles.inputView}>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                    secureTextEntry={false}
                />
                <Input
                    label="Senha"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    keyboardType="default"
                    secureTextEntry={true}
                />
            </View>
            <CustomButton
                title="Login"
                color="#FFB5A7"
                onPress={handleLogin}
            />
            <Text style={styles.textSignUp}>
                Não possui uma conta?{' '}
                <Link
                    href='/autocadastro'
                    style={styles.linkSignUp}
                >Cadastre-se</Link>
            </Text>
        </KeyboardAvoidingView>
    );
}

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
        marginBottom: 5,
        alignSelf: 'center',
    },
    inputView: {
        marginBottom: 15
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
