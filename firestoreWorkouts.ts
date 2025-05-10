import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const workoutCollection = collection(db, 'workouts');

export const fetchWorkouts = async () => {
  const snapshot = await getDocs(workoutCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addWorkout = async (workout: any) => {
  await addDoc(workoutCollection, workout);
};
