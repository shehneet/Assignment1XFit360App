import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import WorkoutLibraryScreen from './screens/WorkoutLibraryScreen';
import WorkoutDetailsScreen from './screens/WorkoutDetailsScreen';
import HomeDashboardScreen from './screens/HomeDashboardScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';
import MapsScreen from './screens/MapsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeDashboard" component={HomeDashboardScreen} />
        <Stack.Screen name="WorkoutLibrary" component={WorkoutLibraryScreen} />
        <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Maps" component={MapsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
