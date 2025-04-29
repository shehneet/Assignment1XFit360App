import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';



import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';

import '../..firebase.js';

const {firebaseConfig} = require('../..firebase.js');


// Initialize Firebase once using imported config
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Welcome!');

  let debugCounter = 0;

  function debug(tag: string, message: string, error?: any) {
    console.log(`${tag} No.${debugCounter}: ${message}`);
    if (error) console.error(error);
    debugCounter++;
  }

  async function loginUser() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setStatus(`Logged in as: ${user.email}`);
      debug('Login', `Success: ${user.email}`);
    } catch (error: any) {
      setStatus('Login failed');
      debug('Login Error', error.message, error);
    }
  }

  async function registerUser() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setStatus(`Account created: ${user.email}`);
      debug('Register', `Success: ${user.email}`);
    } catch (error: any) {
      setStatus('Registration failed');
      debug('Register Error', error.message, error);
    }
  }

  async function logoutUser() {
    try {
      await signOut(auth);
      setStatus('Signed out successfully');
      debug('Logout', 'Success');
    } catch (error: any) {
      setStatus('Logout failed');
      debug('Logout Error', error.message, error);
    }
  }

  async function deleteAccount() {
    try {
      if (auth.currentUser) {
        await deleteUser(auth.currentUser);
        setStatus('User deleted');
        debug('Delete', 'Success');
      } else {
        setStatus('No user to delete');
        debug('Delete', 'No user logged in');
      }
    } catch (error: any) {
      setStatus('Delete failed');
      debug('Delete Error', error.message, error);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.header}>
        <View style={styles.colContainer}>
          <View style={styles.rowContainer}>
            <Text>{status}</Text>
          </View>

          <View style={styles.rowContainer}>
            <TextInput
              style={styles.sUser}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.sUser}
              placeholder="Password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.rowContainer}>
            <Button title="Login" onPress={loginUser} />
            <Button title="Register" onPress={registerUser} />
            <Button title="Logout" onPress={logoutUser} />
            <Button title="Delete" onPress={deleteAccount} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 40,
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  colContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
  },
  sUser: {
    borderBottomWidth: 1,
    width: 140,
    padding: 8,
  },
});
