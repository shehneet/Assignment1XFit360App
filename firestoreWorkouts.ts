import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, increment, arrayUnion} from 'firebase/firestore';

// Reference to the workouts collection
const workoutCollection = collection(db, 'workouts');

// Fetch all workouts from Firestore
export const fetchWorkouts = async () => {
  const snapshot = await getDocs(workoutCollection);
  return snapshot.docs.map((doc: { id: any; data: () => any; }) => ({ id: doc.id, ...doc.data() }));
};

// Add a new workout (e.g. during seeding)
export const addWorkout = async (workout: any) => {
  await addDoc(workoutCollection, workout);
};

// Increment the 'likes' field for a specific workout
export const likeWorkout = async (id: string) => {
  const workoutRef = doc(db, 'workouts', id);
  await updateDoc(workoutRef, {
    likes: increment(1),
  });
};

// Append feedback text to the 'feedback' array field
export const submitFeedback = async (id: string, feedback: string) => {
  const workoutRef = doc(db, 'workouts', id);
  await updateDoc(workoutRef, {
    feedback: arrayUnion(feedback),
  });
};

