import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  ScrollView, TextInput, ActivityIndicator, Alert
} from 'react-native';
import { auth, getUserProfile, updateUserProfile } from '../firebase'; 

const ProfileScreen = () => {
  const [profile, setProfile] = useState<{ email: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const data = await getUserProfile(user.uid);
        const name = data?.name || 'User';
        setProfile({ email: user.email ?? '', name });
        setNameInput(name);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      await updateUserProfile(user.uid, { name: nameInput });
      setProfile((prev) => prev ? { ...prev, name: nameInput } : null);
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
            <TextInput
              style={styles.input}
              value={nameInput}
              onChangeText={setNameInput}
            />
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.name}>{profile?.name}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.editText}>Edit Name</Text>
            </TouchableOpacity>
          </>
        )}
        <Text style={styles.email}>{profile?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F4F6F8',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: '#F4F6F8',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '60%',
    borderRadius: 8,
    textAlign: 'center',
    marginTop: 8,
    backgroundColor: '#fff',
  },
  editText: {
    color: '#007BFF',
    marginTop: 8,
  },
  saveText: {
    color: 'green',
    marginTop: 8,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#444',
  },
});
