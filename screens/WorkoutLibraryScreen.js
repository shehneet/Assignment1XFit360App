import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import workouts from '../data/workouts';

const WorkoutLibraryScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('WorkoutDetails', { workout: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workout Library</Text>
      <FlatList
        data={workouts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default WorkoutLibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
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
  image: {
    height: 120,
    width: '100%',
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    color: '#555',
  },
});
