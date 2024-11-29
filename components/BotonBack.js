import { StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const BotonBack = ({ style, iconStyle , texto}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.BotonBack, style]}>
            <Icon style={[styles.IconBack, iconStyle]} name='chevron-left' />
            {texto && <Text style={styles.texto}> {texto} </Text>}
        </TouchableOpacity>
    )
}
                            // NOTAS IMPORTANTES
// - Tenemos algunos componentes como el texto y el estilo de este 
//boton que se puede adaptar de forma separada dependiando de como sea 
//el diseño de dicha pantalla
// _______________________________________________________________________
//Ejemplo: 
// <BotonBack 
//      style={styles.BotonBackAjustes}
//      iconStyle={styles.IconBackStyle}
//      texto='Notas' //Aqui se puede cambiar el nombres o tambien quitarlo si no lo necesita
//             />,
// _______________________________________________________________________


const styles = StyleSheet.create ({
    BotonBack: {
        flexDirection: 'row',
        position:'absolute',
        top:Platform.OS === 'ios' ? 60: 50,
        marginLeft:16,
    },
    IconBack: {
        color:'#002147',
        fontSize:25,
    },
    texto: {
        color:'#8CAE81',
        marginTop:3,
        fontSize: 16, 
        fontFamily:'OpenSansBold'
      },

})


export default BotonBack;