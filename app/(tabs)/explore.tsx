import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore XFit360</Text>
      <Text style={styles.paragraph}>
        This app is built with Expo Router and React Native.
      </Text>
      <Text style={styles.paragraph}>
        You can navigate across screens like Home, Login, Progress, Workouts, Maps, and more.
      </Text>
      <Text style={styles.paragraph}>
        File-based routing makes it simple to add new pages inside the /app directory.
      </Text>
      <Text style={styles.paragraph}>
        To get started, try editing this file at: <Text style={styles.bold}>app/(tabs)/explore.tsx</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F4F6F8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
    color: '#444',
  },
  bold: {
    fontWeight: '600',
    color: '#000',
  },
});
