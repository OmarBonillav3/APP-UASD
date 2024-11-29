import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { StatusBar } from "expo-status-bar";

export default function Chat () {
    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <Text>PANTALLA PARA LA PRESELECCION DE MATERIA</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FBFBFB'
    }
})