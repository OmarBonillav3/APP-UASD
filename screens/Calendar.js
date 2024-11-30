import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Calendar({ navigation }) {
  
  return (
    <View style={styles.container}>
      <Text> PANTALLA DE HORARIO DE MATERIAS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    justifyContent:'center',
    alignItems:'center',
  },
});
