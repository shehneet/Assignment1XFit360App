import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, ActivityIndicator, TextInput
} from 'react-native';
import { fetchWorkouts, likeWorkout, submitFeedback } from '../firestoreWorkouts';
import { AntDesign } from '@expo/vector-icons';

type Workout = {
  id: string;
  title: string;
  category: string;
  color: string;
  duration: string;
  difficulty: string;
  introduction: string;
  instructions: string[];
  steps: string[];
  likes: number;
  feedback: string[];
};

const WorkoutLibraryScreen = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [newFeedback, setNewFeedback] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchWorkouts();
        setWorkouts(data as Workout[]);
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleLike = async (id: string) => {
    await likeWorkout(id);
    setWorkouts(prev =>
      prev.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w)
    );
  };

  const handleSubmitFeedback = async (id: string) => {
    const text = newFeedback[id];
    if (!text) return;
    await submitFeedback(id, text);
    setWorkouts(prev =>
      prev.map(w =>
        w.id === id ? { ...w, feedback: [...(w.feedback || []), text] } : w
      )
    );
    setNewFeedback(prev => ({ ...prev, [id]: '' }));
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading workouts...</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={workouts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        const isExpanded = expandedIds.includes(item.id);
        return (
          <TouchableOpacity
            onPress={() => toggleExpand(item.id)}
            style={[styles.card, { backgroundColor: item.color }]}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.category} • {item.duration} • {item.difficulty}
            </Text>
            {isExpanded && (
              <View style={styles.details}>
                <Text style={styles.intro}>{item.introduction}</Text>
                <Text style={styles.section}>Instructions:</Text>
                {item.instructions.map((inst, index) => (
                  <Text key={index} style={styles.bullet}>- {inst}</Text>
                ))}
                <Text style={styles.section}>Steps:</Text>
                {item.steps.map((step, index) => (
                  <Text key={index} style={styles.bullet}>• {step}</Text>
                ))}
                <View style={styles.likesRow}>
                  <TouchableOpacity onPress={() => handleLike(item.id)}>
                    <AntDesign name="hearto" size={20} color="red" />
                  </TouchableOpacity>
                  <Text style={styles.likesText}> {item.likes} Likes</Text>
                </View>
                <Text style={styles.section}>Feedback:</Text>
                {item.feedback?.map((fb, index) => (
                  <Text key={index} style={styles.feedback}>- {fb}</Text>
                ))}
                <TextInput
                  style={styles.input}
                  placeholder="Leave feedback..."
                  value={newFeedback[item.id] || ''}
                  onChangeText={(text) =>
                    setNewFeedback(prev => ({ ...prev, [item.id]: text }))
                  }
                />
                <TouchableOpacity
                  onPress={() => handleSubmitFeedback(item.id)}
                  style={styles.feedbackButton}
                >
                  <Text style={styles.feedbackButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default WorkoutLibraryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F4F6F8',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 8,
  },
  details: {
    marginTop: 10,
  },
  intro: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  section: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
    color: '#333',
  },
  bullet: {
    fontSize: 14,
    color: '#444',
    marginLeft: 10,
  },
  feedback: {
    fontSize: 13,
    color: '#666',
    marginLeft: 10,
    marginBottom: 2,
  },
  input: {
    marginTop: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  feedbackButton: {
    marginTop: 6,
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  likesText: {
    fontSize: 14,
    color: '#222',
    marginLeft: 8,
  },
});
