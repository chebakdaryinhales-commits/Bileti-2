import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Экран авторизации' }} />
      <Stack.Screen name="details" options={{ title: 'Второй экран' }} />
    </Stack>
  );
}
