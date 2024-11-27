import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { StatusBar } from "expo-status-bar";

// Importando boton back de la carpeta components
import BotonBack from '../components/BotonBack' // Este es un componente creado por mi para viajar a la pantalla anterior y se puede usar globalmente

export default function Login ({ navigation }) {

    // Declarando constantes de los inputs
    const [matricula, setMatricula] = useState('');
    const [contraseña, setContraseña] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <StatusBar style='dark' />
            <BotonBack />
            <Text style={styles.Title}>Iniciar Session</Text>
            <Text style={styles.Description}>Bienvenido al futuro de nuestro pais</Text>

            {/* Agregando input para el inicio de session */}
            <TextInput
                placeholder='Matricula '
                value={matricula}
                onChangeText={setMatricula}
                style={styles.TextInput} 
            />

            <TextInput
                placeholder='Contraseña'
                value={contraseña}
                onChangeText={setContraseña}
                style={styles.TextInput2} 
                secureTextEntry={true}
            /> 
            
            <TouchableOpacity style={styles.BotonIniciar} onPress={() => navigation.navigate ('HomeTabs')}>
                <Text style={{fontFamily:'RobotoRegular', fontSize:15, color:'#FFFFFF'}}>Iniciar</Text>
            </TouchableOpacity>

            {/* Agregando el boton para iniciar session desde la pantalla login */}
            <View style={styles.BotonInscribir}>
                <Text style={styles.Txt1Boton}>No estas matriculado?</Text>
                <TouchableOpacity onPress={() => navigation.navigate ('Register')}>
                    <Text style={styles.Txt2Boton}> Inscribete</Text>
                </TouchableOpacity>
            </View>

        </View>
        </TouchableWithoutFeedback>
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
        marginTop:136   
    },
    Description: {
        fontFamily:'OpenSansRegular',
        fontSize:13,
        color:'#000000',  
        alignSelf:'center', 
        marginTop:8, 
         
    },

    // Agregando estilos a los inputs
    TextInput: {
        paddingLeft:11,
        marginTop:73,
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
        marginTop:59,
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