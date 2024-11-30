import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform, Image, TouchableOpacity } from 'react-native';
import { UserProvider } from './components/UserContext'; // Importa el UserProvider
import * as Font from 'expo-font';

// Importando depencias para la navegacion
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Importanto las pantallas usables
import LandingScreen from './screens/Landing';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import InfoScreen from './screens/Info';
import CalendarScreen from './screens/Calendar';
import ChatScreen from './screens/Chat';
import UserScreen from './screens/User';
import SolicitudesScreen from './screens/Solicitudes'
import TareaScreen from './screens/Tareas';
import MapScreen from './screens/Map'
import SeleccionScreen from './screens/Seleccion'

// Importando iconos usables
import { AntDesign } from 'react-native-vector-icons'; // Icono user && home 
import { Feather } from 'react-native-vector-icons'; // Icono info && calendar
import { Ionicons } from 'react-native-vector-icons'; //Icono chatbox-outline
import { Octicons } from 'react-native-vector-icons'; // Icono: checklist


// Creando constantes para los tipo de navegacion
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Funcion para la navegacion tipo stack, esta es la navegacion que se usara para login
function NavStack () {
  return (
    <Stack.Navigator
    screenOptions={{ 
      headerShown: false,

    }}
    >
      <Stack.Screen name='Landing' component={LandingScreen}/>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Register' component={RegisterScreen}/>
      <Stack.Screen name='User' component={UserScreen}/>
      <Stack.Screen name='Tarea' component={TareaScreen}/>
      <Stack.Screen name='Solicitudes' component={SolicitudesScreen}/> 
      <Stack.Screen name='Map' component={MapScreen}/>

      <Stack.Screen name='HomeTabs' component={NavTabs} options={{  gestureEnabled: false }}/> 

    </Stack.Navigator>
  );
};
// El gestureEnabled: false funciona para no hacer gestos hacia atras y asi no poder volver a la pantala de login

// Funcion para lo que es la navegacion por Tabs, es la navegacoin que se usara en la pantalla home y las demas funciones.
function NavTabs ({ navigation }) {
  return (
    <Tab.Navigator
    initialRouteName="Home" // Agregando como inicio a Home para cuando se navegue a esta funcion lo primero que aparezca sea home.
    screenOptions={{
      tabBarShowLabel: false, 
      tabBarActiveTintColor: '#002147',
      tabBarInactiveTintColor: '#868585',
    }}
    >
       <Tab.Screen 
        name='Home' 
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <AntDesign name="home" size={size} color={color} />
            )
          },
          headerRight: () => 
            <AntDesign style={styles.UserICon} name='user' onPress={() => navigation.navigate ('User')}/>,
          headerLeft: () => 
            <Image source={require ('./assets/img/LogoUASD.png')} style={styles.ImgLeft}/>

        }}
      />
      <Tab.Screen
        name='Calendario' 
        component={CalendarScreen}
        options={{
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <Feather name="calendar" size={size} color={color} />
            )
          },
        }}
        />
        {/* <Tab.Screen
        name='Seleccion' 
        component={SeleccionScreen}
        options={{
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <Octicons name="checklist" size={size} color={color} />
            )
          },
        }}
        /> */}

      <Tab.Screen
        name='Info' 
        component={InfoScreen}
        options={{
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <Feather name="info" size={size} color={color} />
            )
          },
        }}
        />
    
      
      {/* <Tab.Screen
        name='Chat' 
        component={ChatScreen}
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="chatbox-outline" size={size} color={color} />
            )
          },
        }}
        /> */}
        
    </Tab.Navigator>
  )
}


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); // Constante para el uso de las fuentes

  // Agregando funcion para los fontFamily globales
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "OpenSansRegular": require('./assets/fonts/OpenSans-Regular.ttf'),
        "OpenSansSemiBold": require('./assets/fonts/OpenSans-SemiBold.ttf'),
        "OpenSansBold": require('./assets/fonts/OpenSans-Bold.ttf'),
        "RobotoRegular": require ('./assets/fonts/Roboto-Regular.ttf'),
        "RobotoBold": require ('./assets/fonts/Roboto-Bold.ttf')
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#002147" />
      </View>
    );
  }

  return (
    // Agregando las funcines de tipo de navegacion antes creadas, asi como esta puesta NavStack (Ese es el nombre de la funcion de arriba)
    <UserProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <NavStack />  
      </NavigationContainer>
    </GestureHandlerRootView>
  </UserProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  UserICon: {
    color: '#002147',
    fontSize: Platform.OS === 'ios' ? 29 : 29,
    marginRight: Platform.OS === 'ios' ? 20 : 18,
    marginBottom: Platform.OS === 'ios' ? 4 : 0,
  },
  ImgLeft: {
    resizeMode:'cover', 
    width:60, 
    height:40, 
    marginLeft:16,
    marginBottom:6  
  }
});
