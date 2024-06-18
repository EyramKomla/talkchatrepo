import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function PostScreen(){
    return (
        <View style={styles.postScreenContainer}>
            <Text>Something something</Text>
        </View>
    )
}

function Header(){
    return(
    <View style={{
        width: "100%",
        height: 100,
    }}>
        <View></View>
        <View></View>
        <View></View>
    </View>
    )
}

const styles = StyleSheet.create({
    postScreenContainer:{
        flex:1,
        alignItems: 'center',
    },
})