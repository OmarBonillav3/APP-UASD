import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "react-native-vector-icons"; // Icono flecha: caretright

/* 

  Este es un componente que muestra un ícono de flecha que cambia su dirección
  dependiendo del estado 'isOpen'. 

*/

const DownIcon = ({ isOpen, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <AntDesign
        name={isOpen ? "caretdown" : "caretright"}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  icon: {
    fontSize: 24,
    color: "#002147",
  },
});

export default DownIcon;
