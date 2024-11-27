import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BotonBack from "../components/BotonBack";
import React, { useState, useEffect } from "react";
import DropdownIcon from "../components/DropdownIcon"; // Importar el componente de DropdownIcon
import { useUser } from "../components/UserContext"; // Importar información del usuario logeado
import axios from "axios";

export default function Tareas() {
  const [showPendientes, setShowPendientes] = useState(true);
  const [showCompletadas, setShowCompletadas] = useState(false);
  const [pendientes, setPendientes] = useState([]);
  const [completadas, setCompletadas] = useState([]);

  const { user } = useUser(); // Acceder a la información del usuario desde el contexto

  const togglePendientes = () => setShowPendientes(!showPendientes); // Alternar la variable de estado 'showPendientes' entre true o false
  const toggleCompletadas = () => setShowCompletadas(!showCompletadas);

  const fetchTareas = async () => {
    if (!user || !user.authToken) {
      Alert.alert("Error", "No se encontró un token de autenticación.");
      return;
    }
  
    try {
      const response = await axios.get("https://uasdapi.ia3x.com/tareas", {
        headers: {
          Authorization: `Bearer ${user.authToken}`, // Se usa el token del contexto enviado desde el login.
        },
      });
  
    // console.log(response.data);
  
      if (Array.isArray(response.data)) {
        // Separar las tareas dependiendo de si están completadas o incompletas
        const pendientes = response.data.filter((tarea) => !tarea.completada); // Tareas pendientes
        const completadas = response.data.filter((tarea) => tarea.completada); // Tareas completadas
  
        setPendientes(pendientes);
        setCompletadas(completadas);
      } else {
        Alert.alert("Aviso", "El formato de las tareas no es válido.");
      }
    } catch (error) {
      console.error("Error fetching tareas:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        `No se pudieron cargar las tareas: ${error.response?.data?.message || error.message}`
      );
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BotonBack />
      <ScrollView>
        <View>
          <StatusBar style="dark" />
  
          {/* En esta sección aparecen las tareas que están pendientes, según la API */}
          <TouchableOpacity style={styles.headerContainer} onPress={togglePendientes}>
            <DropdownIcon onPress={togglePendientes} isOpen={showPendientes} />
            <Text style={styles.header}>Pendientes</Text>
          </TouchableOpacity>
          {showPendientes && (
            pendientes.length > 0 ? (
              pendientes.map((tarea, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.title}>{tarea.titulo}</Text>
                  <Text>{tarea.descripcion}</Text> 
                  <Text style={styles.dueDate}>
                    {/* Convertir la fecha a string */}
                   Fecha de vencimiento: {new Date(tarea.fechaVencimiento).toLocaleDateString()} 
                  </Text>
                </View>
              ))
            ) : (
              <Text>No hay tareas pendientes.</Text>
            )
          )}
  
          {/* En esta sección aparecen las tareas que están completadas, según la API */}
          <TouchableOpacity style={styles.headerContainer} onPress={toggleCompletadas}>
            <DropdownIcon onPress={toggleCompletadas} isOpen={showCompletadas} />
            <Text style={styles.header}>Completadas</Text>
          </TouchableOpacity>
          {showCompletadas && (
            completadas.length > 0 ? (
              completadas.map((tarea, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.title}>{tarea.titulo}</Text> 
                  <Text>{tarea.descripcion}</Text> 
                  <Text style={[styles.dueDate, styles.completedDueDate]}>
                    Fecha de vencimiento: {new Date(tarea.fechaVencimiento).toLocaleDateString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text>No hay tareas completadas.</Text>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 40,
    backgroundColor: "#f7f7f7",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: "#6d747e",
    paddingVertical: 10,
  },
  header: {
    fontSize: 22,
    fontFamily: "OpenSansRegular",
    color: "#6d747e",
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    gap: 23,
    padding: 30,
    borderRadius: 8,
    shadowColor: "#000",
    marginBottom: 15,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
  },
  dueDate: {
    paddingHorizontal: 15,
    borderLeftWidth: 2,
    borderLeftColor: "#ffa7bb",
    textAlign: "left",
  },
  completedDueDate: {
    borderLeftColor: "lightblue",
  },
});
