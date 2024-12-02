import React, {useState} from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, Alert, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { StatusBar } from "expo-status-bar";
import axios from 'axios';

import BotonBack from '../components/BotonBack' // Este es un componente creado por mi para viajar a la pantalla anterior y se puede usar globalmente

export default function Register ({ navigation }) {

    // Declarando constantes de los inputs
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [loading, setLoading] = useState(false);

    // Funcion para el boton y funcion para obtener y mandar informacion a la api
    const handleRegister = async () => {
        // Validar que los campos no estén vacíos
        if (!nombre || !apellido || !username || !email || !contraseña || !confirmarContraseña) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        // Verificar si las contraseñas coinciden
        if (contraseña !== confirmarContraseña) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        // Validar formato de email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Por favor ingresa un email válido.");
            return;
        }

        // Configuración para la solicitud a la API
        setLoading(true);

        try {
            const response = await axios.post(
                'https://uasdapi.ia3x.com/crear_usuario',
                {
                    nombre: nombre.trim(),
                    apellido: apellido.trim(),
                    username: username.trim(),
                    password: contraseña.trim(),
                    email: email.trim(),
                },
                {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("Respuesta de la API:", response.data);

            if (response.data?.success) {
                Alert.alert("Éxito", "Usuario registrado correctamente.");
                navigation.navigate('Login'); // Navegar a la pantalla Login
            } else {
                Alert.alert("Error", response.data?.message || "Hubo un problema al registrar.");
            }
        } catch (error) {
            console.error("Error de registro:", error.response?.data || error.message);
            Alert.alert("Error", `Ocurrió un problema: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        //No puedo lograr que esta funcion funcione para android (Esto es para subir la pantalla para tener visibildiad en los TextInput ah la hora de escribir)
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >
        <StatusBar style='dark' />
            <BotonBack />
            <Text style={styles.Title}>Register</Text>
            <Text style={styles.Description}>Unete a <Text style={{fontFamily:'OpenSansBold'}}>UASD</Text> y obtén una de las mejores experiencia de aprendizaje del país</Text>

            <TextInput
                placeholder='Nombre '
                value={nombre}
                onChangeText={setNombre}
                style={styles.TextInput} 
            />
            <TextInput
                placeholder='Apellido '
                value={apellido}
                onChangeText={setApellido}
                style={styles.TextInput2} 
            />
            <TextInput
                placeholder='Matricula '
                value={username}
                onChangeText={setUsername}
                style={styles.TextInput2} 
            />
            <TextInput
                placeholder='Email '
                value={email}
                onChangeText={setEmail}
                style={styles.TextInput2} 
            />

            <TextInput
                placeholder='Contraseña'
                value={contraseña}
                onChangeText={setContraseña}
                style={styles.TextInput2} 
                secureTextEntry={true}
            /> 
            <TextInput
                placeholder='Repetir Contraseña'
                value={confirmarContraseña}
                onChangeText={setConfirmarContraseña}
                style={styles.TextInput2} 
                secureTextEntry={true}
            /> 

            <TouchableOpacity style={styles.BotonIniciar} onPress={handleRegister} disabled={loading}>
                <Text style={{fontFamily:'RobotoRegular', fontSize:15, color:'#FFFFFF'}}>Registrarse</Text>
            </TouchableOpacity>
            
            <View style={styles.BotonInscribir}>
                <Text style={styles.Txt1Boton}>Ya estas matriculado?</Text>
                <TouchableOpacity onPress={() => navigation.navigate ('Login')}>
                    <Text style={styles.Txt2Boton}> Iniciar Session</Text>
                </TouchableOpacity>
            </View>
           </ KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create ({
    container: { 
        flex: 1, 
        backgroundColor:'#FBFBFB',
    },
    Title: {
        fontFamily:'RobotoBold',
        fontSize:18,
        color:'#000000',  
        alignSelf:'center',  
        marginTop:116   
    },
    Description: {
        fontFamily:'OpenSansRegular',
        fontSize:13,
        color:'#000000',  
        alignSelf:'center', 
        textAlign:'center', 
        marginHorizontal:16,
        marginTop:8,
         
    },
    TextInput: {
        paddingLeft:11,
        marginTop:33,
        alignSelf:'center',
        fontSize:Platform.OS === 'ios' ? 14 : 13,
        width:289,
        height:40,
        fontFamily:'RobotoRegular',

        borderRadius:10,
        borderColor:'#002147',
        borderWidth:1.5,
    },
    TextInput2: {
        paddingLeft:11,
        alignSelf:'center',
        marginTop:14,
        fontSize:Platform.OS === 'ios' ? 14 : 13,
        width:289,
        height:40,
        fontFamily:'RobotoRegular',

        borderRadius:10,
        borderColor:'#002147',
        borderWidth:1.5,
    },
    BotonIniciar: {
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',

        backgroundColor:'#002147',
        width:190,
        height:39,
        borderRadius:10,
        marginTop:29,
    },
    BotonInscribir: {
        flexDirection:'row',
        marginTop:14,
        justifyContent:'center',
    },
    Txt1Boton: {
        color:'#00000', 
        fontSize:12, 
        fontFamily:'RobotoRegular', 
        marginTop:2.5
    },
    Txt2Boton: {
        color:'#002147',
        fontSize:14,
        marginBottom:4,
        fontFamily:'RobotoBold'
    },
})