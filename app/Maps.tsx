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
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to view the map');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);
    })();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Fetching your location...</Text>
      </View>
    );
  }

  const initialRegion: Region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      region={initialRegion}
      showsUserLocation
      showsMyLocationButton
    >
      {markers.map((marker) => (
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
