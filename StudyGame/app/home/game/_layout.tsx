import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function GameLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.rosaEscuro,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen name="inicio" options={{ title: "Início" }} />
            <Stack.Screen name="pasta" options={{ title: "Pasta" }} />
            <Stack.Screen name="flashcard" options={{ title: "Flashcard" }} />
            <Stack.Screen name="quiz" options={{ title: "Quiz" }} />
            <Stack.Screen name="novoJogo" options={{ title: "Novo Jogo" }} />
        </Stack>
    )
}