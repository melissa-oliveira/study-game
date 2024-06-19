import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function sairScreen() {

    const [redirect, setRedirect] = React.useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            storeUser();
            setRedirect(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const storeUser = async () => {
        try {
            const jsonValue = JSON.stringify(null);
            await AsyncStorage.setItem('currently-user', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    return (
        <View style={styles.container}>
            {Redirect ? <Redirect href="/login" /> :
                <Image
                    source={require('../../assets/images/studygame_logo.png')}
                    style={styles.logo}
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
        backgroundColor: '#F3D8C7',
    },
    logo: {
        width: 250,
        height: 150,
        alignSelf: 'center',
    },
});
