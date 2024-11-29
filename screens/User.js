import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

// Importando Iconos usables
import { AntDesign } from "react-native-vector-icons";

// Importando boton back de la carpeta components
import BotonBack from "../components/BotonBack";
import { useUser } from "../components/UserContext"; //Componente para la llamada de datos guardado del recien iniciado a la appp

export default function User({ navigation }) {
  const { user } = useUser(); // Obtenemos los datos del usuario del contexto
  const [deuda, setDeuda] = useState(null); // Estado para la deuda

  // Función para obtener la deuda
  const fetchDeuda = async () => {
    if (!user || !user.authToken) {
      Alert.alert("Error", "No se encontró un token de autenticación.");
      return;
    }
    try {
      const response = await axios.get("https://uasdapi.ia3x.com/deudas", {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });

      console.log("Respuesta de la API de deuda:", response.data);

      // Validar si la respuesta es correcta y tiene una deuda
      if (response.data.success && response.data.data) {
        setDeuda(response.data.data);
      } 
      
    } catch (error) {
      console.error("Error al obtener la deuda:", error);
      Alert.alert("Error", "No se pudo obtener la deuda.");
    }
  };

  // Función para pagar la deuda
  const pagarDeuda = async () => {
    if (!deuda) {
      Alert.alert("Error", "No hay deuda para pagar.");
      return;
    }
    
    try {
      const response = await axios.put(
        `https://uasdapi.ia3x.com/deudas/${deuda.id}`,
        { status: "pagado" }, // Actualizamos el estado de la deuda
        {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );

      if (response.data.success) {
        setDeuda(null); // Limpiamos la deuda
        Alert.alert("Pago realizado", "La deuda ha sido pagada.");
      } else {
        Alert.alert("Error", "Hubo un problema al pagar la deuda.");
      }
    } catch (error) {
      console.error("Error al pagar la deuda:", error);
      Alert.alert("Error", "No se pudo realizar el pago.");
    }
  };

  // Cargar la deuda cuando el componente se monta
  useEffect(() => {
    fetchDeuda();
  }, []);

  return (
    <View style={{ alignContent: "center", flex: 1, backgroundColor: "#FBFBFB" }}>
      <StatusBar style="dark" />
      <BotonBack />
      <View style={styles.ViewAvatarUser}>
        <AntDesign style={styles.UserICon} name="user" />
      </View>
      <Text style={styles.TxtUsuario}>
        {user.firstName} {user.lastName}
      </Text>
      <Text style={styles.TxtMatricula}>{user.username}</Text>

      <TouchableOpacity
        style={styles.BotonCerrarSession}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Landing" }],
          })
        }
      >
        <Text style={styles.TxtBotonCerrarSession}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* Sección Deuda */}
      <View style={styles.DeudaContainer}>
        {deuda ? (
          <>
            <Text style={styles.DeudaText}>
              Deuda: ${deuda.amount} {deuda.currency}
            </Text>
            <TouchableOpacity style={styles.PagarDeudaButton} onPress={pagarDeuda}>
              <Text style={styles.TxtPagarDeuda}>Pagar deuda</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.DeudaText}>No tienes ninguna deuda pendiente.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  ViewAvatarUser: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
    marginTop: 146,
    justifyContent: "center",
  },
  UserICon: {
    alignSelf: "center",
    fontSize: 50,
  },
  TxtUsuario: {
    marginTop: 20,
    fontSize: 15,
    alignSelf: "center",
    fontFamily: "RobotoBold",
  },
  TxtMatricula: {
    fontSize: 15,
    alignSelf: "center",
    fontFamily: "RobotoBold",
  },
  BotonCerrarSession: {
    backgroundColor: "#C62E2E",
    width: 129,
    height: 29,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 34,
  },
  TxtBotonCerrarSession: {
    color: "#FFFFFF",
    fontFamily: "RobotoRegular",
    fontSize: 15,
    alignSelf: "center",
  },
  DeudaContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginHorizontal: 16,
    borderColor: "#002147",
    borderWidth: 0.8,
  },
  DeudaText: {
    fontSize: 16,
    fontFamily: "RobotoBold",
    color: "#333",
  },
  PagarDeudaButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  TxtPagarDeuda: {
    color: "#FFFFFF",
    fontFamily: "RobotoRegular",
    fontSize: 14,
  },
});
