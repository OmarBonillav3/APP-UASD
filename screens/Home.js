import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

// Importando Iconoso usables
import { AntDesign } from 'react-native-vector-icons'; // Icono flecha: caretright

export default function Home ({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <StatusBar style='dark' />

            <TouchableOpacity onPress={() => navigation.navigate ('Tarea')}>
                <View style={styles.ViewTareas}>
                    <Text style={styles.TxtTareas}>Mis Tareas</Text>
                    <AntDesign name='caretright' style={styles.IconTareas}/>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create ({
    container: {
        flex:1,
        backgroundColor:'#FBFBFB',
        alignContent:'center'
    },
    ViewTareas: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#F0F0F0',

        width:'auto',
        height:40,
        marginHorizontal:16,
        marginTop:19,

        borderRadius:10,
        borderColor:'#002147',
        borderWidth:0.8
    },
    TxtTareas: {
        fontFamily:'RobotoRegular',
        fontSize:14,
        color:'#000000',
        marginLeft:16,
    },
    IconTareas: {
        marginLeft:'auto',
        marginRight:16,
    },
})