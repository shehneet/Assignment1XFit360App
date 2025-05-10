import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  ScrollView, TextInput, ActivityIndicator, Alert
} from 'react-native';
import { auth, db, updateUserProfile } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const [profile, setProfile] = useState<{
    email: string;
    name?: string;
    bio?: string;
    goals?: string;
    fitnessLevel?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [bioInput, setBioInput] = useState('');
  const [goalsInput, setGoalsInput] = useState('');
  const [fitnessLevelInput, setFitnessLevelInput] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false); 
          return;
        }

        const docRef = doc(db, 'users', user.uid);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          const newUserData = {
            name: 'User',
            bio: '',
            goals: '',
            fitnessLevel: '',
            email: user.email ?? '',
          };

          await updateUserProfile(user.uid, newUserData); // Create new profile
          setProfile(newUserData);
          setNameInput(newUserData.name);
          setBioInput('');
          setGoalsInput('');
          setFitnessLevelInput('');
        } else {
          const data = snapshot.data();

          setProfile({
            email: user.email ?? '',
            name: data.name ?? '',
            bio: data.bio ?? '',
            goals: data.goals ?? '',
            fitnessLevel: data.fitnessLevel ?? '',
          });

          setNameInput(data.name ?? '');
          setBioInput(data.bio ?? '');
          setGoalsInput(data.goals ?? '');
          setFitnessLevelInput(data.fitnessLevel ?? '');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateUserProfile(user.uid, {
        name: nameInput,
        bio: bioInput,
        goals: goalsInput,
        fitnessLevel: fitnessLevelInput,
      });

      setProfile({
        email: user.email ?? '',
        name: nameInput,
        bio: bioInput,
        goals: goalsInput,
        fitnessLevel: fitnessLevelInput,
      });

      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to update profile');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || '')}&background=random` }}
          style={styles.avatar}
        />
        {isEditing ? (
          <>
            <TextInput style={styles.input} placeholder="Name" value={nameInput} onChangeText={setNameInput} />
            <TextInput style={styles.input} placeholder="Bio" value={bioInput} onChangeText={setBioInput} />
            <TextInput style={styles.input} placeholder="Goals" value={goalsInput} onChangeText={setGoalsInput} />
            <TextInput style={styles.input} placeholder="Fitness Level" value={fitnessLevelInput} onChangeText={setFitnessLevelInput} />
            <TouchableOpacity onPress={handleSave}><Text style={styles.saveText}>Save</Text></TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.name}>{profile?.name}</Text>
            <Text style={styles.email}>{profile?.email}</Text>
            <Text style={styles.info}>Bio: {profile?.bio}</Text>
            <Text style={styles.info}>Goals: {profile?.goals}</Text>
            <Text style={styles.info}>Fitness Level: {profile?.fitnessLevel}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}><Text style={styles.editText}>Edit Profile</Text></TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#F4F6F8' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100, backgroundColor: '#F4F6F8' },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 60, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  email: { fontSize: 16, color: '#666', marginBottom: 12 },
  info: { fontSize: 14, color: '#444', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, width: '90%', borderRadius: 8, marginTop: 8, backgroundColor: '#fff' },
  editText: { color: '#007BFF', marginTop: 8 },
  saveText: { color: 'green', marginTop: 8, fontWeight: 'bold' },
});
