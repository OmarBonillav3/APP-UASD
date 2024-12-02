import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import axios from "axios";

// Importando componentes usables
import BotonBack from "../components/BotonBack"; 
import { useUser } from "../components/UserContext"; // Importamos el hook del contexto

export default function NewPassword ({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user } = useUser(); // Obtener el usuario desde el contexto

  const handleChangePassword = async () => {
    // Validaciones en el frontend
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://uasdapi.ia3x.com/cambiar_password",
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.authToken}`, // Token JWT
          },
        }
      );
  
      // Validar respuesta de la API
      if (response.data.success) {
        Alert.alert("Éxito", response.data.message || "Contraseña cambiada exitosamente.");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        navigation.reset({
          index: 0,
          routes: [{ name: "Landing" }],
        })
      } else {
        Alert.alert("Error", response.data.error || "Hubo un problema con la solicitud.");
      }
    } catch (error) {
      console.error("Error al cambiar contraseña:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "No se pudo cambiar la contraseña.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.Container}>
        <BotonBack />
        <Text style={styles.Title}>Cambiar Contraseña</Text>
    
      <TextInput
        placeholder="Contraseña actual"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry={true}
        style={styles.TextInput}
      />

      <TextInput
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
        style={styles.TextInput2}
      />

      <TextInput
        placeholder="Confirmar Nueva Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        style={styles.TextInput3}
      />

      <TouchableOpacity style={styles.BotonCambiar} onPress={handleChangePassword}>
        <Text style={{ fontFamily: "RobotoRegular", fontSize: 15, color: "#FFFFFF" }}>
          Cambiar
        </Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1, 
    backgroundColor: "#FBFBFB",
  },
  Title: {
    fontFamily: "RobotoBold",
    color: "#000000",
    fontSize: 18,
    marginTop: 136,
    alignSelf: "center",  
  },
  TextInput: {
    paddingLeft: 11,
    marginTop: 33,
    alignSelf: "center",
    fontSize: Platform.OS === "ios" ? 14 : 13,
    width: 289,
    height: 40,
    fontFamily: "RobotoRegular",
    borderRadius: 10,
    borderColor: "#002147",
    borderWidth: 1.5,
  },
  TextInput2: {
    paddingLeft: 11,
    marginTop: 14,
    alignSelf: "center",
    fontSize: Platform.OS === "ios" ? 14 : 13,
    width: 289,
    height: 40,
    fontFamily: "RobotoRegular",
    borderRadius: 10,
    borderColor: "#002147",
    borderWidth: 1.5,
  },
  TextInput3: {
    paddingLeft: 11,
    marginTop: 14,
    alignSelf: "center",
    fontSize: Platform.OS === "ios" ? 14 : 13,
    width: 289,
    height: 40,
    fontFamily: "RobotoRegular",
    borderRadius: 10,
    borderColor: "#002147",
    borderWidth: 1.5,
  },
  BotonCambiar: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002147",
    width: 190,
    height: 39,
    borderRadius: 10,
    marginTop: 59,
  },
});
