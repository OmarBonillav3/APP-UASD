import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import { StatusBar } from "expo-status-bar";

// Importando boton back de la carpeta components
import BotonBack from '../components/BotonBack'

export default function User () {
    return (
        <View style={{ alignContent:'center', flex:1, backgroundColor:'#FBFBFB'}}>
            <StatusBar style='dark' />
            <BotonBack />
            <View style={styles.ViewAvatarUser}>
                <Text>IMAGEN DE USUARIO</Text>
            </View>
            <Text style={styles.TxtUsuario}>Omar Bonilla</Text>
            <Text style={styles.TxtMatricula}>2022-0328</Text>

        {/* Agregar un boton para cerrar y el de pago y hago la funcion de pago */}
        </View>
    );
};

const styles = StyleSheet.create ({
    container: {
        flex:1,
        alignContent:'center',
    },
    ViewAvatarUser: {
        width:90,
        height:90,
        borderRadius:50,
        backgroundColor:'#D9D9D9',
        alignSelf:'center',
        marginTop:146,
    },
    TxtUsuario: {
        fontSize:15,
        alignSelf:'center'
    },
    TxtMatricula: {
        fontSize:15,
        alignSelf:'center'
    },
})