import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import { StatusBar } from "expo-status-bar";

// Importando Iconos usables
import { AntDesign } from 'react-native-vector-icons';

// Importando boton back de la carpeta components
import BotonBack from '../components/BotonBack'
import { useUser } from '../components/UserContext' //Componente para la llamada de datos guardado del recien iniciado a la appp

export default function User ({ navigation }) {
    const { user } = useUser(); // Obtenemos los datos del usuario del contexto
    return (
        <View style={{ alignContent:'center', flex:1, backgroundColor:'#FBFBFB'}}>
            <StatusBar style='dark' />
            <BotonBack />
            <View style={styles.ViewAvatarUser}>
                 <AntDesign style={styles.UserICon} name='user' />
            </View>
            <Text style={styles.TxtUsuario}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.TxtMatricula}>{user.username}</Text>

        <TouchableOpacity style={styles.BotonCerrarSession} onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Landing' }],
                  })}>
            <Text style={styles.TxtBotonCerrarSession}>Cerrar session</Text>
        </TouchableOpacity>
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
        justifyContent:'center',
    },
    UserICon: {
        alignSelf:'center',
        fontSize:50,
    },
    TxtUsuario: {
        marginTop:20,
        fontSize:15,
        alignSelf:'center',
        fontFamily:'RobotoBold'
    },
    TxtMatricula: {
        fontSize:15,
        alignSelf:'center',
        fontFamily:'RobotoBold'
    },
    BotonCerrarSession: {
        backgroundColor:'#C62E2E',
        width:129,
        height:29,
        borderRadius:10,
        justifyContent:'center',
        alignSelf:'center',
        marginTop:34,


    },
    TxtBotonCerrarSession: {
        color:'#FFFFFF',
        fontFamily:'RobotoRegular',
        fontSize:15,
        alignSelf:'center',
    },
})