import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BotonBack from '../components/BotonBack';

const Mapa = ({ route }) => {
  const { coordenadas } = route.params;
  const [latitude, longitude] = coordenadas.split(',').map(coord => parseFloat(coord));

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <BotonBack  iconStyle={styles.IconBackStyle} />
      </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 10, // Distancia desde la parte superior
    left: 10, // Distancia desde el borde izquierdo
    zIndex: 1, // Asegura que el botón esté por encima del mapa
    backgroundColor: 'transparent', // Hacer que el fondo sea transparente
  },
  IconBackStyle: {
    fontSize:30
  }
});

export default Mapa;
