import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform, Image } from 'react-native';
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

// Importando iconos usables
import { AntDesign } from 'react-native-vector-icons'; // Icono user && home 
import { Feather } from 'react-native-vector-icons'; // Icono info && calendar
import { Ionicons } from 'react-native-vector-icons'; //Icono chatbox-outline
import { EvilIcons } from 'react-native-vector-icons'; // Probando icono de usuario


// Creando constantes para los tipo de navegacion
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Stack.Screen name='HomeTabs' component={NavTabs}  options={{  gestureEnabled: false }}/>

    </Stack.Navigator>
  );
};

function NavTabs () {
  return (
    <Tab.Navigator>
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
          <EvilIcons style={styles.UserICon} name='user'/>,
          headerLeft: () => 
            <Image source={require ('./assets/img/LogoUASD.png')} style={styles.ImgLeft}/>

        }}
      />
      <Tab.Screen
        name='Info' 
        component={InfoScreen}
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <Feather name="info" size={size} color={color} />
            )
          },
          headerRight: () => 
          <EvilIcons style={styles.UserICon} name='user'/>,
          headerLeft: () => 
            <Image source={require ('./assets/img/LogoUASD.png')} style={styles.ImgLeft}/>

        }}
        />
      <Tab.Screen
        name='Calendario' 
        component={CalendarScreen}
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          tabBarIcon: ({ color, size }) => {
            return (
              <Feather name="calendar" size={size} color={color} />
            )
          },
          headerRight: () => 
          <EvilIcons style={styles.UserICon} name='user'/>,
          headerLeft: () => 
            <Image source={require ('./assets/img/LogoUASD.png')} style={styles.ImgLeft}/>

        }}
        />
      <Tab.Screen
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
          headerRight: () => 
          <EvilIcons style={styles.UserICon} name='user'/>,
          headerLeft: () => 
            <Image source={require ('./assets/img/LogoUASD.png')} style={styles.ImgLeft}/>

        }}
        />
        
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
    <GestureHandlerRootView>
      <NavigationContainer>
        <NavStack />  
      </NavigationContainer>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  UserICon: {
    color: '#00000',
    fontSize: 39,
    marginRight: Platform.OS === 'ios' ? 20 : 18,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  ImgLeft: {
    resizeMode:'cover', 
    width:60, 
    height:40, 
    marginLeft:16,
    marginBottom:6
    
      
  }
});
