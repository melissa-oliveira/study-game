import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function HomeLayout() {

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerInactiveTintColor: Colors.roxoAzulado,
          drawerActiveTintColor: Colors.rosaEscuro,
          drawerStyle: {
            backgroundColor: Colors.rosaClaro,
            width: 240,
          },
          headerStyle: {
            backgroundColor: Colors.rosaMedio,
          },
          headerTintColor: 'white',
        }}
      >
        <Drawer.Screen
          name="game"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='home-outline' size={18} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="comoJogar"
          options={{
            drawerLabel: 'Como Jogar',
            title: 'Como Jogar',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='help-outline' size={18} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="estatisticas"
          options={{
            drawerLabel: 'Estatísitcas',
            title: 'Estatísitcas',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='trending-up-outline' size={18} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="perfil"
          options={{
            drawerLabel: 'Perfil',
            title: 'Perfil',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='person-outline' size={18} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="sair"
          options={{
            drawerLabel: 'Sair',
            title: 'Sair',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='exit-outline' size={18} color={color} />
            )
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({

})

