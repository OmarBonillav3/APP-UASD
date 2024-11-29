import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import axios from "axios";

// Importando componentes
import { useUser } from "../components/UserContext";
import DownIcon from "../components/DownIcon";

// Importando Iconos usables
import { AntDesign } from "react-native-vector-icons"; // Icono flecha: caretright

export default function Home({ navigation }) {
  const [noticias, setNoticias] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [showNoticias, setShowNoticias] = useState(false); // Estado para mostrar u ocultar noticias
  const { user } = useUser();

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  // Función para obtener las noticias
  const fetchNoticias = async () => {
    if (!user || !user.authToken) {
      Alert.alert("Error", "No se encontró un token de autenticación.");
      return;
    }
    try {
      const response = await axios.get("https://uasdapi.ia3x.com/noticias", {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });

      console.log("Respuesta completa de la API:", response.data); // Log para verificar la estructura

      // Validar si la API devuelve éxito y si `data` es un array
      if (response.data.success && Array.isArray(response.data.data)) {
        setNoticias(response.data.data.slice(0, 3)); // Guardar solo las tres primeras noticias
        console.log("Noticias cargadas correctamente:", response.data.data.slice(0, 3));
      } else {
        Alert.alert("Aviso", "No se encontraron noticias en la respuesta.");
      }
    } catch (error) {
      console.error("Error al obtener noticias:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        `No se pudieron cargar las noticias: ${error.response?.data?.message || error.message}`
      );
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      {/* Sección Mis Tareas */}
      <TouchableOpacity onPress={() => navigation.navigate("Tarea")}>
        <View style={styles.ViewTareas}>
          <Text style={styles.TxtTareas}>Mis Tareas</Text>
          <AntDesign name="caretright" style={styles.IconTareas} />
        </View>
      </TouchableOpacity>

      {/* Sección Noticias */}
      <TouchableOpacity onPress={() => setShowNoticias(!showNoticias)}>
        <View style={[styles.ViewNoticias, { height: 41 }]}>
          <Text style={styles.TxtNoticias}>Noticias</Text>
          <AntDesign
            name={showNoticias ? "caretdown" : "caretright"} // Cambiar ícono según estado
            style={styles.IconNoticias}
          />
        </View>
      </TouchableOpacity>

      {/* Mostrar noticias si el estado `showNoticias` es true */}
      {showNoticias && noticias.length > 0 ? (
        noticias.map((noticia) => {
          const isOpen = expandedId === noticia.id; // Verificar si está expandida
          return (
            <View key={noticia.id} style={{marginHorizontal:16}}>
            <View style={styles.NoticiaCard}>
              {/* Contenido de la noticia */}
              <View style={styles.NoticiaHeader}>
                <Image
                  source={{ uri: noticia.img }}
                  style={styles.NoticiaImg}
                />
                <View style={styles.NoticiaContent}>
                  <Text style={styles.NoticiaTitle}>{noticia.title}</Text>
                  <Text style={styles.NoticiaDate}>{noticia.date}</Text>
                </View>
              </View>
              </View>
            </View>
          );
        })
      ) : null}

      <View style={styles.ViewVideos}>
          <Text style={styles.TxtVideos}>Videos</Text>
          <AntDesign name="caretright" style={styles.IconTareas} />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
  },
  ViewTareas: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    height: 40,
    marginHorizontal: 16,
    marginTop: 19,
    borderRadius: 10,
    borderColor: "#002147",
    borderWidth: 0.8,
  },
  TxtTareas: {
    fontFamily: "RobotoRegular",
    fontSize: 14,
    color: "#000000",
    marginLeft: 16,
  },
  IconTareas: {
    marginLeft: "auto",
    marginRight: 16,
  },
                // VISTAS DE LAS NOTICIAS
  ViewNoticias: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 11,
    marginHorizontal: 16,
    marginTop: 19,
    marginBottom:10,
    borderRadius: 10,
    borderColor: "#002147",
    borderWidth: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  TxtNoticias: {
    fontFamily: "RobotoRegular",
    fontSize: 14,
    color: "#000000",
    marginLeft: 16,
  },
  IconNoticias: {
    marginRight: 16,
    color: "#000000",
  },
  NoticiaCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    borderColor: "#ddd",
    borderWidth: 1,
    width:'auto',

  },
  NoticiaImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  NoticiaHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  NoticiaContent: {
    flex: 1,
  },
  NoticiaTitle: {
    fontFamily: "RobotoBold",
    fontSize: 14,
    color: "#333",
  },
  NoticiaDate: {
    fontFamily: "RobotoRegular",
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  NoticiaBody: {
    marginTop: 10,
  },
  NoticiaDescription: {
    fontFamily: "RobotoRegular",
    fontSize: 12,
    color: "#333",
  },
        //VIEW PARA LOS VIDEOS
  ViewVideos: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    height: 40,
    marginHorizontal: 16,
    marginTop: 9,
    borderRadius: 10,
    borderColor: "#002147",
    borderWidth: 0.8,
  },
  TxtVideos: {
    fontFamily: "RobotoRegular",
    fontSize: 14,
    color: "#000000",
    marginLeft: 16,
  },
});
