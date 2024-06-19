import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    title: string,
    onPress: any,
    color: string
}

const CustomButton = (props: Props) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: props.color }]} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomButton;
