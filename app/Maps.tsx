import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';

type MarkerItem = {
  id: string;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

const MapsScreen: React.FC = () => {
  // State to hold user's current location
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

  // State to handle loading indicator
  const [loading, setLoading] = useState(true);

  // Predefined markers (fitness places)
  const markers: MarkerItem[] = [
    {
      id: '1',
      title: 'La Trobe Gym',
      description: 'Main campus gym with weights & cardio machines',
      coordinate: {
        latitude: -37.7215,
        longitude: 145.047,
      },
    },
    {
      id: '2',
      title: 'Campus Oval',
      description: 'Perfect for running laps and HIIT',
      coordinate: {
        latitude: -37.7209,
        longitude: 145.0485,
      },
    },
  ];

  // UseEffect hook to request location permissions and get current location
  useEffect(() => {
    (async () => {
      // Request permission to access user's location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to view the map');
        setLoading(false); // Stop loading state if permission is denied
        return;
      }

      // Get the current position (latitude and longitude)
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords); // Set location to the user's coordinates
      setLoading(false); // Stop the loading indicator after getting location
    })();
  }, []); // Empty dependency array ensures this runs once on component mount

  // If loading or no location available, show loading indicator
  if (loading || !location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" /> {/* Spinner while loading */}
        <Text style={{ marginTop: 10 }}>Fetching your location...</Text>
      </View>
    );
  }

  // Set initial region based on the user's current location
  const initialRegion: Region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01, // Zoom level
    longitudeDelta: 0.01, // Zoom level
  };

  return (
    <MapView
      style={styles.map} // Apply the map style
      provider={PROVIDER_GOOGLE} // Use Google Maps provider
      region={initialRegion} // Set initial region to user's location
      showsUserLocation // Show user's current location on the map
      showsMyLocationButton // Show a button to center map to user location
    >
      {/* Render markers for fitness places */}
      {markers.map((marker) => (
        <Marker
          key={marker.id} // Unique key for each marker
          coordinate={marker.coordinate} // Set the position of the marker
          title={marker.title} // Title of the marker (appears on tap)
          description={marker.description} // Description of the marker
        />
      ))}
    </MapView>
  );
};

export default MapsScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1, // Makes the map take full available space
  },
  loader: {
    flex: 1, // Full screen loader
    justifyContent: 'center', // Centers the loader
    alignItems: 'center', // Centers the loader
    backgroundColor: '#F4F6F8', // Light background color
  },
});
