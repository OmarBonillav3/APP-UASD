import React, { useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BotonBack from '../components/BotonBack';

const Mapa = ({ route, navigation }) => {
  const { coordenadas } = route.params;

  // Función para solicitar permisos de ubicación en Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de ubicación requerido',
            message: 'Esta aplicación necesita acceso a tu ubicación para mostrar el mapa.',
            buttonNeutral: 'Preguntar después',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Aceptar',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permiso de ubicación denegado');
        } else {
          console.log('Permiso de ubicación otorgado');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (!granted) {
          await requestLocationPermission();
        }
      }
    };
    checkAndRequestPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* Botón de retroceso */}
        <BotonBack 
          iconStyle={styles.IconBackStyle} 
          onPress={() => navigation.goBack()} 
        />
      </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coordenadas[0], // Latitud
          longitude: coordenadas[1], // Longitud
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: coordenadas[0], longitude: coordenadas[1] }} />
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
    fontSize: 30,
  },
});

export default Mapa;
