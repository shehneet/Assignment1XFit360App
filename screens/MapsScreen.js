import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const MapsScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const markers = [
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to view the map');
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Fetching your location...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
};

export default MapsScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
  },
});
