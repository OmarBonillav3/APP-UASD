import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

// Importando Iconos
import { AntDesign } from '@expo/vector-icons';

// Importando componentes
import { useUser } from "../components/UserContext";

export default function Seleccion ({ navigation }) {
  const [materias, setMaterias] = useState([]);
  const [preseleccionadas, setPreseleccionadas] = useState([]);
  const { user } = useUser();

  // Función para obtener las materias disponibles
  const fetchMaterias = async () => {
    if (!user || !user.authToken) {
      Alert.alert("Error", "No se encontró un token de autenticación.");
      return;
    }
    try {
      const response = await axios.get("https://uasdapi.ia3x.com/materias_disponibles", {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });

      if (Array.isArray(response.data)) {
        setMaterias(response.data);
      }
    } catch (error) {
      console.error("Error fetching materias:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        `No se pudieron cargar las materias: ${error.response?.data?.message || error.message}`
      );
    }
  };

  // Función para obtener materias preseleccionadas de la nueva API
  const fetchPreseleccionadas = async () => {
    if (!user || !user.authToken) {
      Alert.alert("Error", "No se encontró un token de autenticación.");
      return;
    }

    try {
      const response = await axios.get("https://uasdapi.ia3x.com/ver_preseleccion", {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setPreseleccionadas(response.data.data);
      } else {
        Alert.alert("Error", "No se pudieron cargar las materias preseleccionadas.");
      }
    } catch (error) {
      console.error("Error fetching preseleccionadas:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        `No se pudieron cargar las materias preseleccionadas: ${error.response?.data?.message || error.message}`
      );
    }
  };

  // Función para preseleccionar una materia
  const preseleccionarMateria = async (codigo) => {
    try {
      const response = await axios.post(
        "https://uasdapi.ia3x.com/preseleccionar_materia",
        `"${codigo}"`,
        {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Éxito", "Materia preseleccionada correctamente.");
        fetchPreseleccionadas(); // Actualiza la lista de materias preseleccionadas
        fetchMaterias(); // Actualiza las materias disponibles
      } else {
        Alert.alert("Cuidado", "Revisa si ya la tienes preseleccionada.");
      }
    } catch (error) {
      console.error("Error preseleccionando materia:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        `No se pudo preseleccionar: ${error.response?.data?.message || error.message}`
      );
    }
  };


  // Cargar materias y preseleccionadas al montar el componente
  useEffect(() => {
    fetchMaterias();
    fetchPreseleccionadas();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Preselección de Materias</Text>

      {/* Lista de materias disponibles */}
      <Text style={styles.subtitleDisponibles}>Materias Disponibles</Text>
      {materias.length > 0 ? (
        materias.map((materia) => (
          <View key={materia.codigo} style={styles.card}>
            <Text style={styles.name}>{materia.nombre}</Text>
            <Text style={styles.details}>
              Horario: {materia.horario} | Aula: {materia.aula}
            </Text>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => preseleccionarMateria(materia.codigo)}
            >
              <AntDesign name="pluscircleo" size={24} color="#002147" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No hay materias disponibles en este momento.</Text>
      )}

      {/* Lista de materias preseleccionadas */}
      <Text style={styles.subtitlePreseleccion}>Materias Preseleccionadas</Text>
      {preseleccionadas.length > 0 ? (
        preseleccionadas.map((materia) => (
          <View key={materia.codigo} style={styles.card}>
            <Text style={styles.name}>{materia.nombre}</Text>
            <Text style={styles.details}>
              Aula: {materia.aula}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No hay materias preseleccionadas actualmente.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 90 : 100,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 16,
    marginBottom:30,
    fontFamily:'RobotoBold'
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    borderColor:'#002147',
    borderWidth:0.8,
  },
  header: {
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontFamily:'OpenSansBold',
    color:'#000000'

  },
  details: {
    fontSize: 13,
    color: "#666",
    fontFamily:'OpenSansRegular'
  },
  iconButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },

  subtitleDisponibles: {
    color:'#002147',
    fontFamily:'OpenSansBold',
    fontSize:15,
    marginBottom:3,
  },
  subtitlePreseleccion: {
    color:'#A8CD89',
    fontFamily:'OpenSansBold',
    fontSize:15,
    marginTop:10,
    marginBottom:3,

  },
});
