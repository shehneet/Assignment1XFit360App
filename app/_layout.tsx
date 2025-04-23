import { Slot } from 'expo-router';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Slot /> {/* This renders the matching screen from /app */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
