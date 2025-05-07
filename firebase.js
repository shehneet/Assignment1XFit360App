import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBdxqCXukOhdktog5pFLXNRuIWcRXiOETc",
  authDomain: "xfit360-cdd96.firebaseapp.com",
  projectId: "xfit360-cdd96",
  storageBucket: "xfit360-cdd96.appspot.com", 
  messagingSenderId: "1033253813884",
  appId: "1:1033253813884:web:3358e2d8618cf0fb5413f9",
  measurementId: "G-QMMC4XWCXL",
};

export async function getUserProfile(uid) {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    return null;
  }
}

export async function updateUserProfile(uid, data) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, data);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register a new user
export async function registerUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    createdAt: new Date().toISOString(),
  });

  return user;
}


// Login an existing user
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Logout current user
export async function logoutUser() {
  await signOut(auth);
}

// Delete current user
export async function deleteCurrentUser() {
  if (auth.currentUser) {
    await deleteUser(auth.currentUser);
  }
}

// Export the firebase app and auth instance
export { app, auth, db, firebaseConfig };
