import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { fetchWorkouts } from '../firestoreWorkouts'; // Import Firestore fetch function

// Define the shape of a Workout object
type Workout = {
  id: string;
  title: string;
  category: string;
  color: string;
  duration: string;
  difficulty: string;
};

const WorkoutLibraryScreen = () => {
  // Local state to hold workouts and loading indicator
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch workouts from Firestore on component mount
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchWorkouts(); // Async call to Firestore
        setWorkouts(data as Workout[]); // Store results in state
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    loadWorkouts(); // Trigger workout loading
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Loading workouts...</Text>
      </View>
    );
  }

  // Render the list of workouts once data is ready
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workout Library</Text>

      <FlatList
        data={workouts} // Pass workouts to FlatList
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.category} • {item.duration} • {item.difficulty}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id} // Unique key for each workout
      />
    </View>
  );
};

export default WorkoutLibraryScreen;

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});