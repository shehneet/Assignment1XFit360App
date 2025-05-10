import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser,} from 'firebase/auth';
import { getFirestore, getDoc, setDoc, updateDoc, doc, collection, getDocs, query, where,} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBdxqCXukOhdktog5pFLXNRuIWcRXiOETc",
  authDomain: "xfit360-cdd96.firebaseapp.com",
  projectId: "xfit360-cdd96",
  storageBucket: "xfit360-cdd96.appspot.com",
  messagingSenderId: "1033253813884",
  appId: "1:1033253813884:web:3358e2d8618cf0fb5413f9",
  measurementId: "G-QMMC4XWCXL",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Get user profile from Firestore
export async function getUserProfile(uid) {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
}

// Update user profile in Firestore
export async function updateUserProfile(uid, data) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, data, { merge: true });
}

// Get workouts personalized to user's fitness level
export async function getPersonalizedWorkouts() {
  const user = auth.currentUser;
  if (!user) return [];

  const profileRef = doc(db, 'users', user.uid);
  const profileSnap = await getDoc(profileRef);
  const profile = profileSnap.data();

  const workoutsRef = collection(db, 'workouts');
  const q = query(workoutsRef, where('fitnessLevel', '==', profile?.fitnessLevel || 'Beginner'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Register a new user
export async function registerUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, 'users', user.uid), {
    name: '',
    bio: '',
    goals: '',
    fitnessLevel: '',
  });
  return userCredential.user;
}

// Log in an existing user
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Log out the current user
export async function logoutUser() {
  await signOut(auth);
}

// Delete the current user
export async function deleteCurrentUser() {
  if (auth.currentUser) {
    await deleteUser(auth.currentUser);
  }
}

// Export Firebase modules
export { app, auth, db, firebaseConfig };
