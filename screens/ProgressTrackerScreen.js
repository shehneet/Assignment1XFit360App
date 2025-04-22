import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProgressScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Progress & Stats</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <Text style={styles.sectionData}>Workouts: 4</Text>
        <Text style={styles.sectionData}>Calories Burned: 1,340 kcal</Text>
        <Text style={styles.sectionData}>Time Spent: 2h 15m</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Streak</Text>
        <Text style={styles.streakText}>6-Day Workout Streak!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <Text style={styles.achievement}>Completed 10 workouts</Text>
        <Text style={styles.achievement}>Hit weekly goal 3 times</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Goals</Text>
        <Text style={styles.sectionData}>5 workouts in next 7 days</Text>
        <Text style={styles.sectionData}>Try 1 new category: Yoga</Text>
      </View>
    </ScrollView>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F4F6F8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  sectionData: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  achievement: {
    fontSize: 16,
    color: '#111',
    marginBottom: 6,
  },
});
