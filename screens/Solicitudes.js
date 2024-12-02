import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, ActivityIndicator, Alert, TextInput, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign"; // Importando iconos usables
import Circle from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker"; // Importar Picker para los tipos de solicitudes
import axios from "axios";

//Importanto componentes
import BotonBack from "../components/BotonBack";
import { useUser } from "../components/UserContext"; // Importar información del usuario logeado

export default function Solicitudes() {
  // Métodos y estados relacionados al formulario para añadir solicitudes
  const [formVisible, setFormVisible] = useState(false);
  const toggleFormVisible = () => {
    setFormVisible((prev) => !prev);
  };
  
  const [tipo, setTipo] = useState(""); // Tipo de solicitud
  const [descripcion, setDescripcion] = useState(""); // Descripción de la solicitud
  const [solicitudes, setSolicitudes] = useState([]); // Estado para las solicitudes
  const [loading, setLoading] = useState(true); // Estado para indicar carga
  const { user } = useUser(); // Acceder a la información del usuario desde el contexto

  // Tipos de solicitudes (código en la API/nombre que se va a mostrar en la tarjeta)
  const tipoMapping = {
    beca: "Beca",
    carta_estudio: "Carta de estudios",
    record_nota: "Record de notas",
  };

  // Llamada a la API al cargar el componente
  // Método para ver las solicitudes creadas
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get(
          "https://uasdapi.ia3x.com/mis_solicitudes",
          {
            headers: {
              Authorization: `Bearer ${user.authToken}`,
            },
          }
        );
        // Asegurar que response.data.data siempre sea un Arra antes de guardarlo en el state
      setSolicitudes(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchSolicitudes();
  }, []);

  // Alternar expansión de tarjeta
  const [expandedCard, setExpandedCard] = useState(null);
  const toggleCard = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  // Método para cancelar una solicitud
  const cancelarSolicitud = async (id) => {
    if (!id) {
      Alert.alert("Error", "ID de la solicitud no encontrado.");
      return;
    }
  
    try {
      setLoading(true);
  
      const response = await axios.post(
        "https://uasdapi.ia3x.com/cancelar_solicitud",
        id, // Enviar el id para eliminar una solicitud
        {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        setSolicitudes((prev) =>
          prev.filter((solicitud) => solicitud.id !== id)
        );
        Alert.alert("Éxito", "Solicitud cancelada correctamente.");
      } else {
        Alert.alert(
          "Error",
          response.data.message || "No se pudo cancelar la solicitud."
        );
      }
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error.response || error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Ocurrió un problema al cancelar la solicitud."
      );
    } finally {
      setLoading(false);
    }
  };
  
  // Método para crear una solicitud
  const handleSubmit = async (tipo, descripcion) => {
    try {
      const response = await axios.post(
        "https://uasdapi.ia3x.com/crear_solicitud",
        {
          tipo: tipo,
          descripcion: descripcion,
        },
        {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        Alert.alert("Éxito", "Solicitud creada correctamente.");
        setFormVisible(false); // Cerrar el formulario
        // Hacer un fetch a la lista actualizada de solicitudes después de crear una
        const updatedSolicitudes = await axios.get(
          "https://uasdapi.ia3x.com/mis_solicitudes",
          {
            headers: {
              Authorization: `Bearer ${user.authToken}`,
            },
          }
        );
        setSolicitudes(updatedSolicitudes.data.data); // Actualizar la lista
      } else {
        Alert.alert("Error", response.data.error || "No se pudo crear la solicitud.");
      }
    } catch (error) {
      console.error("Error al crear la solicitud:", error.response || error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Ocurrió un problema al crear la solicitud."
      );
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <BotonBack />
      <ScrollView>
        <View style={styles.parentCtn}>
          <View style={styles.headerCtn}>
            <Text style={styles.header}>Mis Solicitudes</Text>
            <TouchableOpacity style={styles.addBtn} onPress={toggleFormVisible}>
              <Icon name="pluscircle" size={30} color="#1c4c96" />
            </TouchableOpacity>
          </View>
          {formVisible && (
            <View style={styles.form}>
              <Text style={styles.label}>Tipo de Solicitud:</Text>
              
              <Picker
                selectedValue={tipo}
                onValueChange={(itemValue) => {
                  setTipo(itemValue);
                }}
                style={styles.picker}
              >
                <Picker.Item
                  label="Seleccionar un tipo"
                  value="Seleccionar un tipo"
                />
                <Picker.Item label="Beca" value="beca" />
                <Picker.Item label="Record de notas" value="record_nota" />
                <Picker.Item label="Carta de estudios" value="carta_estudio" />
              </Picker>
              <Text style={styles.label}>Descripción:</Text>
              <TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
              />
              <TouchableOpacity
                style={styles.crearBtn}
                onPress={() => handleSubmit(tipo, descripcion)}
              >
                <Text style={styles.crearTxt}>Crear Solicitud</Text>
              </TouchableOpacity>
            </View>
          )}
          {loading ? (
            <ActivityIndicator size="large" color="#1c4c96" />
          ) : solicitudes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image source={require('../assets/img/empty.png')} style={styles.image} />
              <Text style={styles.emptySubtitle}>
                Aún no tienes solicitudes. Presiona el botón "+" para crear una
                nueva.
              </Text>
            </View>
          ) : (
            solicitudes.map((solicitud, index) => (
              <TouchableOpacity
                key={solicitud.id || `solicitud-${index}`} 
                style={styles.card}
                onPress={() => toggleCard(solicitud.id)} 
              >
                <Text style={styles.title}>
                  {solicitud.descripcion || "Descripción no disponible"}
                </Text>
                <Text style={styles.info}>
                  {tipoMapping[solicitud.tipo] || "Tipo desconocido"}
                </Text>

                {expandedCard === solicitud.id && (
                  <View>
                    <Text style={styles.info}>
                      Fecha de solicitud:{" "}
                      {new Date(solicitud.fechaSolicitud).toLocaleDateString()}
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 40 : 50,
    paddingHorizontal: 16,
    backgroundColor: "#FBFBFB",
  },
  parentCtn: {
    width: "100%",
  },
  headerCtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:40,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    gap: 20,
    marginTop: 100
  },
  image: {
    width: 300,
    height: 300,
  },
  emptySubtitle: {
    textAlign: 'center',
    fontFamily: 'RobotoRegular',
    color: '#333',
    fontSize: 16
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
  form: {
    backgroundColor: "#F0F0F0",
    width:'auto',
    marginHorizontal:16,
    padding: 30,
    borderRadius: 20,
    flex: 1,
    gap: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    height: 55,
    borderRadius: 10,
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
  },
  crearBtn: {
    backgroundColor: "#1C4C96",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  crearTxt: {
    color: "white",
    textAlign: "center",
  },
});