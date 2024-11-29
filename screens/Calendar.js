import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'; // Asegúrate de tener axios instalado

// Importando el componente BotonBack si lo necesitas
import BotonBack from '../components/BotonBack';
import { useUser } from "../components/UserContext"; // Importar información del usuario logeado

export default function Calendar({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); // Estado para controlar la expansión de las tarjetas

  const { user } = useUser();

  // Función para obtener eventos
  const fetchEventos = async () => {
    if (!user || !user.authToken) {
      Alert.alert("Error", "No se encontró un token de autenticación.");
      return;
    }

    try {
      const response = await axios.get("https://uasdapi.ia3x.com/eventos", {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });


      if (Array.isArray(response.data)) {
        setEventos(response.data); // Guardar los eventos en el estado
        console.log("Eventos recibidos y guardados:", response.data); // Log para verificar los eventos guardados
      } else {
        Alert.alert("Aviso", "El formato de los eventos no es válido.");
      }
    } catch (error) {
      console.error("Error fetching eventos:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        `No se pudieron cargar los eventos: ${error.response?.data?.message || error.message}`
      );
    }
  };

  // Usar useEffect para cargar los eventos cuando se monta el componente
  useEffect(() => {
    fetchEventos();
  }, []);

  // Función para alternar la expansión de la tarjeta
  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Log para verificar el estado de eventos
  console.log("Estado de eventos:", eventos);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      {/* Título de la pantalla */}
      <Text style={styles.title}>Eventos de la UASD</Text>

      {/* Listado de eventos */}
      {eventos.length > 0 ? (
        eventos.map((evento, index) => (
          <TouchableOpacity
            key={evento.id}
            style={styles.card}
            onPress={() => toggleCard(index)} // Alterna la expansión de la tarjeta
          >
            <View style={styles.header}>
              <Text style={styles.name}>{evento.titulo}</Text>
              <Text style={styles.date}>{new Date(evento.fechaEvento).toLocaleDateString()}</Text>
            </View>
            {expandedCard === index && ( // Si la tarjeta está expandida, mostrar detalles
              <View style={styles.details}>
                <Text style={styles.description}>{evento.descripcion}</Text>
                <Text style={styles.place}>Lugar: {evento.lugar}</Text>
                {/* <Text style={styles.coordinates}>Coordenadas: {evento.coordenadas}</Text> */}

                {/* Botón para ver el mapa */}
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() =>
                    navigation.navigate('Map', { coordenadas: evento.coordenadas }) // Navegar a la pantalla de mapa
                  }
                >
                  <Text style={styles.mapButtonText}>Ver en el mapa</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={{ textAlign: 'center', fontSize: 14, color: '#888', fontFamily:'OpenSansRegular' }}>
          No hay eventos disponibles.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    padding: 16,
  },
  title: {
    fontFamily: 'RobotoBold',
    marginTop: Platform.OS === 'ios' ? 100 : 90,
    fontSize: 23,
    marginBottom: Platform.OS === 'ios' ? 50 : 40,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    
    borderRadius: 10,
    borderColor:'#002147',
    borderWidth:0.8, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'OpenSansBold',
    fontSize: Platform.OS === 'ios' ? 18 : 17,
    color: '#444',
  },
  date: {
    fontFamily: 'OpenSansRegular',
    fontSize: Platform.OS === 'ios' ? 14 : 12 ,
    color: '#666',
    marginTop: Platform.OS === 'ios' ? 4 : 5,
  },
  details: {
    marginTop: 10,
  },
  description: {
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  place: {
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  mapButton: {
    backgroundColor: '#002147',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily:'OpenSansBold'
  },
});
