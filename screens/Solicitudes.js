import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BotonBack from "../components/BotonBack";
import Icon from "react-native-vector-icons/AntDesign";
import Circle from "react-native-vector-icons/FontAwesome";
import { useUser } from "../components/UserContext"; // Importar información del usuario logeado
import axios from "axios";

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]); // Estado para las solicitudes
  const [loading, setLoading] = useState(true); // Estado para indicar carga
  const { user } = useUser(); // Acceder a la información del usuario desde el contexto

  // Llama a la API al cargar el componente
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get(
          "https://uasdapi.ia3x.com/mis_solicitudes",
          {
            headers: {
              Authorization: `Bearer ${user.authToken}`, // Token del contexto
            },
          }
        );
        setSolicitudes(response.data.data); // Actualiza las solicitudes
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
      } finally {
        setLoading(false); // Detén el indicador de carga
      }
    };

    fetchSolicitudes();
  }, []);

  // Tipos de solicitudes (código en la API/nombre que se va a mostrar en la tarjeta)
  const tipoMapping = {
    beca: "Beca",
    carta_estudio: "Carta de estudios",
    record_nota: "Record de notas",
  };

  // Alternar expansión de tarjeta
  const [expandedCard, setExpandedCard] = useState(null);
  const toggleCard = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  // Método para cancelar una solicitud
  const cancelarSolicitud = async (id) => {
    try {
      setLoading(true); // Mostrar indicador de carga
  
      // Enviar el ID directamente como cuerpo de la solicitud
      const response = await axios.post(
        "https://uasdapi.ia3x.com/cancelar_solicitud",
        id, // Pasar el ID como número
        {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
            "Content-Type": "application/json", // Encabezado opcional
          },
        }
      );
  
      if (response.data.success) {
        // Eliminar la solicitud cancelada de la lista
        setSolicitudes((prev) => prev.filter((solicitud) => solicitud.id !== id));
        Alert.alert("Éxito", "Solicitud cancelada correctamente.");
      } else {
        Alert.alert("Error", response.data.message || "No se pudo cancelar la solicitud.");
      }
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error.response || error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Ocurrió un problema al cancelar la solicitud."
      );
    } finally {
      setLoading(false); // Detener indicador de carga
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <BotonBack />
      <ScrollView>
        <View style={styles.parentCtn}>
          <View style={styles.headerCtn}>
            <Text style={styles.header}>Mis Solicitudes</Text>
            <TouchableOpacity style={styles.addBtn}>
              <Icon name="pluscircle" size={30} color="#1c4c96" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#1c4c96" />
          ) : (
            solicitudes.map((solicitud) => (
              <TouchableOpacity
                key={solicitud.id} // Usa el identificador único
                style={styles.card}
                onPress={() => toggleCard(solicitud.id)} // Alterna expansión
              >
                <Text style={styles.title}>
                  {solicitud.descripcion || "Descripción no disponible"}
                </Text>
                <Text style={styles.info}>
                  {tipoMapping[solicitud.tipo] || "Tipo desconocido"}
                </Text>

                {/* Mostrar detalles si está expandida */}
                {expandedCard === solicitud.id && (
                  <View>
                    <Text style={styles.info}>
                      Fecha de solicitud:{" "}
                      {new Date(
                        solicitud.fechaSolicitud
                      ).toLocaleDateString()}
                    </Text>
                    <View style={styles.estadoCtn}>
                      <Circle
                        name="circle"
                        size={12}
                        color={
                          solicitud.estado === "Pendiente"
                            ? "#ebca3f"
                            : "#4caf50"
                        }
                      />
                      <Text style={styles.info}>
                        {solicitud.estado || "Estado no disponible"}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={() => cancelarSolicitud(solicitud.id)}
                    >
                      <Text style={styles.cancelTxt}>Cancelar Solicitud</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 40 : 50,
    paddingHorizontal: 50,
    backgroundColor: "#FBFBFB",
  },
  parentCtn: {
    width: "100%",
  },
  headerCtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: "RobotoRegular",
    color: "#333",
  },
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 7,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "OpenSansSemiBold",
    color: "#555555",
  },
  info: {
    color: "#555555",
    fontFamily: "RobotoRegular",
  },
  estadoCtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  cancelBtn: {
    marginTop: 30,
    backgroundColor: "#002147",
    padding: 10,
    borderRadius: 10,
  },
  cancelTxt: {
    color: "white",
    textAlign: "center",
  },
});
