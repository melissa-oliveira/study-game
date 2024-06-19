import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: any;
}

const Input = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={props.value}
                    onChangeText={props.onChangeText}
                    secureTextEntry={props.secureTextEntry}
                    keyboardType={props.keyboardType}
                    style={styles.input}
                    underlineColorAndroid="transparent"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        paddingHorizontal: 20,
        width: '100%',
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#6B799B',
    },
    inputContainer: {
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingLeft: 10,
        elevation: 5,
    },
    input: {
        height: 40,
        fontSize: 16,
        color: '#6B799B',
    },
});

export default Input;
