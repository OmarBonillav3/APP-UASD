import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

/* 

  Este es un componente que muestra un ícono de flecha que cambia su dirección
  dependiendo del estado 'isOpen'. 

*/

const DropdownIcon = ({ isOpen, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <Icon
        name={isOpen ? "chevron-small-down" : "chevron-small-right"}
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
    color: "#6d747e",
  },
});

export default DropdownIcon;
