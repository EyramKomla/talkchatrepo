import { StyleSheet, Text, View, Button, Dimensions,ScrollView, StatusBar, Image} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import  FontAwesome  from '@expo/vector-icons/FontAwesome';

export default function ExpandedContentView(){
    return (
        <View style={styles.container}>
            <Text>Something should be here</Text>
        </View>
    )
}

const styles={
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
}