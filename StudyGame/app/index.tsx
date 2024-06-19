
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

  const [redirect, setRedirect] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {redirect ? <Redirect href="/login" /> :
        <Image
          source={require('../assets/images/studygame_logo.png')}
          style={styles.logo}
        />}
    </View>
  );
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

