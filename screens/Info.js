import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const developers = [
    {
        name: 'Jesimiel Marte',
        matricula: '2022-1124',
        bio: 'Desarrolladora full-stack apasionada por crear sitios web funcionales y visualmente atractivos, así como aplicaciones móviles con React Native. ',
        photo: require('../assets/img/jesi.jpeg'),
    },
    {
        name: 'Francis Jiménez',
        matricula: '2022-0593',
        bio: 'Estudiante de término en desarrollo de software, con gran pasión por el mundo de los datos y su impacto en la tecnología.',
        photo: require('../assets/img/fran.jpeg'), 
    },
    {
        name: 'Elvin Ramirez',
        matricula: '2022-0335',
        bio: 'Apasionado del desarrollo móvil y web, buscando soluciones innovadoras para mejorar la experiencia del usuario.',
        photo: require('../assets/img/elvin.jpg'),
    },
    {
        name: 'Omar Bonilla',
        matricula: '2022-0328',
        bio: 'Busco introducirme en el mundo del desarrollo móvil en la parte del FrontEnd e intento aumentar mis capacidades cada día ',
        photo: require('../assets/img/omar.jpeg'),
    },
];

export default function Info() {

    //Funcionalidad para expandir la carta
    const [expandedCard, setExpandedCard] = useState(null);
    const toggleCard = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.title}>Desarrolladores</Text>
            {developers.map((dev, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.card} 
                    onPress={() => toggleCard(index)}
                >
                    <View style={styles.header}>
                        <Image source={dev.photo} style={styles.photo} />
                        <Text style={styles.name}>{dev.name}</Text>
                    </View>
                    {expandedCard === index && (
                        <View style={styles.details}>
                            <Text style={styles.matricula}>Matrícula: {dev.matricula}</Text>
                            <Text style={styles.bio}>{dev.bio}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        padding: 16,
    },
    title: {
        fontFamily:'RobotoBold',
        marginTop:120,
        fontSize: 23,
        marginBottom: 50,
        textAlign: 'center',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    name: {
        fontFamily:'OpenSansBold',
        fontSize: 15,
        color: '#444',
    },
    details: {
        marginTop: 8,
    },
    matricula: {
        fontFamily:'OpenSansSemiBold',
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    bio: {
        fontFamily:'OpenSansRegular',
        fontSize: 13,
        color: '#555',
    },
});
