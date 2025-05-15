import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView
} from 'react-native';
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
  rating: number;
  reviews: string[];
};

const MapsScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<MarkerItem | null>(null);

  const markers: MarkerItem[] = [
    {
      id: '1',
      title: 'La Trobe Gym',
      description: 'Main campus gym with weights & cardio machines',
      coordinate: { latitude: -37.7215, longitude: 145.047 },
      rating: 4.5,
      reviews: [
        'Great equipment and helpful staff.',
        'Busy during peak hours, but very clean.',
      ],
    },
    {
      id: '2',
      title: 'Campus Oval',
      description: 'Perfect for running laps and HIIT',
      coordinate: { latitude: -37.7209, longitude: 145.0485 },
      rating: 4.8,
      reviews: [
        'Peaceful and spacious.',
        'Excellent for morning runs!',
      ],
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
    <View style={{ flex: 1 }}>
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
            onPress={() => setSelectedMarker(marker)}
          />
        ))}
      </MapView>

      {selectedMarker && (
        <ScrollView style={styles.reviewCard}>
          <Text style={styles.reviewTitle}>{selectedMarker.title}</Text>
          <Text style={styles.reviewDesc}>{selectedMarker.description}</Text>
          <Text style={styles.rating}>⭐ {selectedMarker.rating.toFixed(1)} / 5.0</Text>
          <Text style={styles.reviewHeader}>Reviews:</Text>
          {selectedMarker.reviews.map((review, index) => (
            <Text key={index} style={styles.reviewText}>• {review}</Text>
          ))}
        </ScrollView>
      )}
    </View>
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
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 4,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  reviewDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    color: '#FFB800',
    marginBottom: 8,
  },
  reviewHeader: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
    color: '#333',
  },
  reviewText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
});