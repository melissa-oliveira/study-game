import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" options={{ title: "Logo" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="autocadastro" options={{ title: "Autocadastro" }} />
    </Stack>
  );
}
