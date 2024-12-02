import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import axios from "axios";

//Importando componente
import BotonBack from "../components/BotonBack";
import DropdownIcon from "../components/DropdownIcon"; // Importar el componente de DropdownIcon
import { useUser } from "../components/UserContext"; // Importar información del usuario logeado

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
        <View style={{marginTop:30,}}>
          <Text style={{fontFamily:'RobotoRegular', fontSize:16, alignSelf:'center'}}>Listo para avanzar algunas tareas?</Text>
          <Text style={{fontFamily:'RobotoBold', fontSize:16, alignSelf:'center'}}>¡Te deseo mucho éxito con tus notas!</Text>
        </View>
        <View>
          <StatusBar style="dark" />
          <View style={{marginBottom:20, marginTop:46}}>
    
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
                   Fecha de vencimiento: {new Date(tarea.fechaVencimiento).toLocaleDateString()} 
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{alignSelf:'center', fontSize:14, fontFamily:'RobotoBold', color:'#A8CD89'}}>Ya no tienes mas tareas, Descansa.</Text>
            )
          )}
          </View>
  
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
              <Text style={{alignSelf:'center', fontSize:14, fontFamily:'RobotoBold', color:'#ffa7bb'}}>No haz completado ninguna tarea por ahora.</Text>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 40 : 50,
    paddingHorizontal: 16,
    backgroundColor: "#FBFBFB",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor:'#F0F0F0',
    borderRadius:10,
    borderColor:'#002147',
    borderWidth:0.8,

    width:'auto',
    height:45,
  },
  header: {
    marginTop:2,
    fontSize: 15,
    fontFamily: "RobotoRegular",
    color: "#000000",
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    gap: 23,
    padding: 30,
    marginBottom: 15,
    elevation: 1,
    marginTop:2,

    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
    borderColor:'#002147',
    borderWidth:0.8, 
  },
  title: {
    fontFamily:'OpenSansRegular',
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
    borderLeftColor: "#A8CD89",
  },
});