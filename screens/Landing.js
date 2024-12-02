import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from "expo-status-bar";

export default function Landing ({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <Image style={styles.img} source={require ('../assets/img/LogoUASD.png')} />
            <Text style={styles.Txt1}>Formamos profesionales éticos y competentes, comprometidos con el desarrollo de la sociedad.</Text>
            <Text style={styles.Txt2}>Con los <Text style={{fontFamily:'RobotoBold'}}>valores</Text> de Excelencia, Compromiso social, Etica, Transparencia e Inclusión</Text>

            <TouchableOpacity style={styles.BotonLogin} onPress={() => navigation.navigate('Login')}>
                <Text style={{color:'#FFFFFF', }}>Iniciar Session</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate ('Register')} style={styles.BotonRegister}>
                <Text style={{color:'#002147', }}>Inscribirse</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create ({
    container: { flex: 1, backgroundColor:'#FBFBFB'},
    img: {
        resizeMode:'cover', 
        width:277, 
        height:185, 
        alignSelf:'center', 
        marginTop:83,
    },
    Txt1:{
        textAlign:'center', 
        marginBottom:15, 
        marginTop:25, 
        marginHorizontal:16, 
        fontFamily:'RobotoRegular', 
        fontSize:14
    },
    Txt2:{
        textAlign:'center', 
        marginTop:15, 
        marginHorizontal:25, 
        fontFamily:'RobotoRegular', 
        fontSize:14
    },
    BotonLogin: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#002147',
        width:190,
        height:39,
        borderRadius:10,
        alignSelf:'center',
        marginTop:173,
    },
    BotonRegister: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FBFBFB',
        width:190,
        height:39,
        borderRadius:10,
        borderColor:'#002147',
        borderWidth:1,
        alignSelf:'center',
        marginTop:13, 
    },
})