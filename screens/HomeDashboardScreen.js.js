import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HomeDashboardScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.widget}>
        <Text style={styles.widgetTitle}>Weekly Workout Summary</Text>
        <Text style={styles.widgetValue}>4 sessions • 2 hrs 15 mins</Text>
      </View>

      <View style={styles.widget}>
        <Text style={styles.widgetTitle}>Calories Burned</Text>
        <Text style={styles.widgetValue}>1,340 kcal</Text>
      </View>

      <View style={styles.widget}>
        <Text style={styles.widgetTitle}>AI Tip of the Day</Text>
        <Text style={styles.widgetValue}>Try adding mobility work before your HIIT sessions!</Text>
      </View>

      <Text style={styles.section}>Quick Access</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WorkoutLibrary')}
      >
        <Text style={styles.buttonText}>Go to Workout Library</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Progress')}
      >
        <Text style={styles.buttonText}>View Progress</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Maps')}
      >
        <Text style={styles.buttonText}>Open Map Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>My Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeDashboardScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F4F6F8',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  widget: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  widgetValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#111',
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
    color: '#444',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
