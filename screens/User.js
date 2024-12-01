import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

// Importando Iconos usables
import { AntDesign } from "react-native-vector-icons";
import Icon from 'react-native-vector-icons/Entypo';
import { Octicons } from "react-native-vector-icons"; // Icono gear, Para los ajustes

// Importando boton back de la carpeta components
import BotonBack from "../components/BotonBack"; 
import { useUser } from "../components/UserContext"; //Componente para la llamada de datos guardado del recien iniciado a la appp

export default function User({ navigation }) {
  const { user } = useUser(); // Obtenemos los datos del usuario del contexto
  const [deuda, setDeuda] = useState(null); // Estado para la deuda
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [deudaPagada, setDeudaPagada] = useState(false); // Estado para la deuda pagada

  // -----------------------------------------------------------------------------------------------------
  // FUNCION PARA OBTENER DEUDA DE LA API
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
      // Verifica si hay una deuda pendiente en la respuesta
      const deudas = response.data;
      if (Array.isArray(deudas) && deudas.length > 0) {
        const deudaPendiente = deudas.find((deuda) => !deuda.pagada); // Busca la primera deuda no pagada
        if (deudaPendiente) {
          setDeuda(deudaPendiente); // Establece la deuda pendiente en el estado
        } else {
          setDeuda(null); // Si no hay deudas pendientes, establece el estado como null
        }
      } else {
        setDeuda(null); // Si no hay deudas en la respuesta, establece el estado como null
      }
    } catch (error) {
      console.error("Error al obtener la deuda:", error);
      Alert.alert("Error", "No se pudo obtener la deuda.");
    }
  };
  // Cargar la deuda cuando el componente se monta
  useEffect(() => {
    fetchDeuda();
  }, []);
  // -----------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------
  // FUNCION PARA MOSTAR MODAL DE PAGO
  const mostrarModalPago = () => {
    setModalVisible(true);
    setDeudaPagada(true); // Simula que la deuda ha sido pagada
    setTimeout(() => {
      setModalVisible(false); // Cierra el modal después de 2 segundos
    }, 2000);
  };
  // -----------------------------------------------------------------------------------------------------

  return (
    <View style={{ alignContent: "center", flex: 1, backgroundColor: "#FBFBFB" }}>
      <StatusBar style="dark" />
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.BotonBack}>
          <Icon style={styles.IconBack} name='chevron-left' />
        </TouchableOpacity>

          <Octicons name='gear' style={styles.IconoAjustes} onPress={() => navigation.navigate ('NewPassword')}/>
      </View>

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
        {deudaPagada ? (
          <Text style={styles.DeudaText}>Deuda pagada</Text> // Muestra mensaje cuando la deuda es pagada
        ) : deuda ? (
          <>
            <Text style={styles.DeudaText}>
              Deuda: ${deuda.monto}
            </Text>
            <TouchableOpacity style={styles.PagarDeudaButton} onPress={mostrarModalPago}>
              <Text style={styles.TxtPagarDeuda}>Pagar deuda</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.DeudaText}>No tienes ninguna deuda pendiente.</Text>
        )}
      </View>

      {/* Modal de pago */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AntDesign name="checkcircle" size={90} color="white" />
            <Text style={styles.modalText}>Deuda pagada</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  BotonBack: {
    top:Platform.OS === 'ios' ? 60: 50,
    marginLeft:16,
  },
  IconBack: {
    color:'#002147',
    fontSize:25,
  },
  IconoAjustes: {
    fontSize:25,
    top:Platform.OS === 'ios' ? 60: 50,
    marginLeft:'auto',
    marginRight:16,
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
  // ESTILO PARA EL VIEW DEUDAS
  DeudaContainer: {
    position: 'absolute',  
    bottom: Platform.OS === 'ios' ? 80 : 60,            
    left: 16,              
    right: 16, 
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

  // ESTILO PARA EL MODAL
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#4CAF50",
    padding: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    width: '100%',
    height: '100%',
  },
  modalText: {
    color: "white",
    fontSize: 20,
    fontFamily: "RobotoBold",
    marginTop: 10,
  },
});
