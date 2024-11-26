import { View, Text, ScrollView } from 'react-native'
import { StatusBar } from "expo-status-bar";

export default function Home () {
    return (
        <ScrollView style={{ alignContent:'center', flex:1, backgroundColor:'#FBFBFB'}}>
            <StatusBar style='dark' />
            <Text>HOLA MUNDO</Text>
        </ScrollView>
    );
};