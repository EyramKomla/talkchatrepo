import { StyleSheet, Text, View, Button, Dimensions,ScrollView, StatusBar, Image, TextInput} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useRef } from 'react';
import  FontAwesome  from '@expo/vector-icons/FontAwesome';

export default function SearchScreen(){
    return (
        <View style={styles.container}>
            <Text>Something suppose dey here</Text>
        </View>
    )
}


styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
    },
})