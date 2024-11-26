import React, {useState} from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';

import BotonBack from '../components/BotonBack' // Este es un componente creado por mi para viajar a la pantalla anterior y se puede usar globalmente

export default function Register ({ navigation }) {

    // Declarando constantes de los inputs
    const [matricula, setMatricula] = useState('');
    const [contraseña, setContraseña] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <BotonBack />
            <Text style={styles.Title}>Register</Text>
            <Text style={styles.Description}>Unete a <Text style={{fontFamily:'OpenSansBold'}}>UASD</Text> y obtén una de las mejores experiencia de aprendizaje del país</Text>

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
            <TextInput
                placeholder='Repetir Contraseña'
                value={contraseña}
                onChangeText={setContraseña}
                style={styles.TextInput2} 
                secureTextEntry={true}
            /> 


            <TouchableOpacity style={styles.BotonIniciar}>
                <Text style={{fontFamily:'RobotoRegular', fontSize:15, color:'#FFFFFF'}}>Registrarse</Text>
            </TouchableOpacity>

            {/* Agregando el boton para iniciar session desde la pantalla login */}
            <View style={styles.BotonInscribir}>
                <Text style={styles.Txt1Boton}>Ya estas matriculado?</Text>
                <TouchableOpacity onPress={() => navigation.navigate ('Login')}>
                    <Text style={styles.Txt2Boton}> Iniciar Session</Text>
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
        textAlign:'center', 
        marginHorizontal:16,
        marginTop:8,
         
    },
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