import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, Platform } from "react-native";
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
  const [eventos, setEventos] = useState([]); // Contante para la funcion de los eventos
  const [expandedCard, setExpandedCard] = useState(null); // Constante para expandir la tarjeta de los eventos
  const { user } = useUser(); // Constante para las funciones con la api

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  // FUNCION PARA OBTENER LAS NOTICIAS
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

      // console.log("Respuesta completa de la API:", response.data); // Log para verificar la estructura

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


  //FUNCION PARA OBTENER LOS EVENTOS
  const fetchEventos = async () => {
    if (!user || !user.authToken) {
      Alert.alert("Error", "No se encontró un token de autenticación.");
      return;
    }

    try {
      const response = await axios.get("https://uasdapi.ia3x.com/eventos", {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });

      if (Array.isArray(response.data)) {
        setEventos(response.data); // Guardar los eventos en el estado
        console.log("Eventos recibidos y guardados:", response.data); // Log para verificar los eventos guardados
      }
    } catch (error) {
      console.error("Error fetching eventos:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        `No se pudieron cargar los eventos: ${error.response?.data?.message || error.message}`
      );
    }
  };
  
  useEffect(() => {
    fetchEventos();
  }, []);

  // Función para alternar la expansión de la tarjeta
  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };


  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

              {/*   SECCION DE LAS TAREAS   */}
      <TouchableOpacity onPress={() => navigation.navigate("Tarea")}>
        <View style={styles.ViewTareas}>
          <Text style={styles.TxtTareas}>Mis Tareas</Text>
          <AntDesign name="caretright" style={styles.IconTareas} />
        </View>
      </TouchableOpacity>

      {/* Sección Mis Solicitudes */}
      <TouchableOpacity onPress={() => navigation.navigate("Solicitudes")}>
        <View style={styles.ViewTareas}>
          <Text style={styles.TxtTareas}>Mis Solicitudes</Text>
          <AntDesign name="caretright" style={styles.IconTareas} />
        </View> 
      </TouchableOpacity>

            {/*   SECCION DE LAS NOTICIAS    */}
      <TouchableOpacity onPress={() => setShowNoticias(!showNoticias)}>
        <View style={[styles.ViewNoticias, { height: 41 }]}>
          <Text style={styles.TxtNoticias}>Noticias</Text>
          <AntDesign
            name={showNoticias ? "caretdown" : "caretright"} // Cambiar ícono según estado
            style={styles.IconNoticias}
          />
        </View>
      </TouchableOpacity>

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

      {/* AGREGANDO LA VISTA DE LOS EVENTOS*/}
      {eventos.length > 0 ? (
        eventos.map((evento, index) => (
        <View style={styles.ViewEventos} key={evento.id}>
          <Text style={styles.TxtEventos}>Eventos</Text>
  
          {/* VISTA DE LAS TARJETAS DE LOS EVENTOS */}
          <TouchableOpacity style={styles.card} onPress={() => toggleCard(index)}>
          <View style={styles.header}>
            <Text style={styles.name}>{evento.titulo}</Text>
            <Text style={styles.date}>{new Date(evento.fechaEvento).toLocaleDateString()}</Text>
            <AntDesign
              name={expandedCard === index ? "caretdown" : "caretright"} // Mostrar "caretdown" si está expandido, "caretright" si no
              style={styles.IconEventos}
            />
          </View>
            {expandedCard === index && ( // Si la tarjeta está expandida, mostrar detalles
              <View style={styles.details}>
                <Text style={styles.description}>{evento.descripcion}</Text>
                <Text style={styles.place}>Lugar: {evento.lugar}</Text>

                {/* Botón para ver el mapa */}
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() =>
                    navigation.navigate('Map', { coordenadas: evento.coordenadas }) // Navegar a la pantalla de mapa
                  }
                >
                  <Text style={styles.mapButtonText}>Ver en el mapa</Text>
                </TouchableOpacity>
              </View>
            )}
            </TouchableOpacity>
      </View>
      ))
    ) : (
      <Text style={{ textAlign: 'center', fontSize: 14, color: '#888', fontFamily:'OpenSansRegular' }}>
        No hay eventos disponibles.
      </Text>
    )}
          {/* VISTAS PARA LOS VIDEOS */}
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
        //VIEW PARA LOS EVENTOS
  ViewEventos: {
    // flexDirection: "row",
    // alignItems: "center",
    backgroundColor: "#F0F0F0",
    height: 'auto', //Volviendo el cuadro de los eventos responsive segun la cantidad de eventos
    marginHorizontal: 16,
    marginTop: 9,
    marginBottom:10,
    borderRadius: 10,
    borderColor: "#002147",
    borderWidth: 0.8,
  },
  TxtEventos: {
    fontFamily: "RobotoRegular",
    fontSize: 14,
    color: "#000000",
    marginLeft: 16,
    
    marginVertical:12,
  },
  IconEventos: {
    marginLeft: "auto",
    marginRight: 16,
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal:16,
    marginBottom: 16,
    elevation: 3,
    
    borderRadius: 10,
    borderColor:'#002147',
    borderWidth:0.8, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:10,
    paddingBottom:10,
    marginHorizontal:16,
  },
  name: {
    fontFamily: 'OpenSansBold',
    fontSize: Platform.OS === 'ios' ? 15 : 14,
    color: '#444',
    marginRight:5,
    
  },
  date: {
    fontFamily: 'OpenSansRegular',
    fontSize: Platform.OS === 'ios' ? 12 : 12 ,
    color: '#666',
    marginTop: Platform.OS === 'ios' ? 3 : 2,
    marginRight:5,
  },
  details: {
    marginTop: 10,
    marginBottom:16,
    marginHorizontal:16,
  },
  description: {
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  place: {
    fontFamily: 'OpenSansRegular',
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  mapButton: {
    backgroundColor: '#002147',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily:'OpenSansBold'
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
