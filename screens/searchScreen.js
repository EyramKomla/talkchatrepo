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

export function SearchBar({ placeholder, onSearch }){
    return (
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          selectionColor={'purple'}
        />
      </View>
    );
  };

styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    searchContainer:{
        width:"90%",
        backgroundColor: "rgb(183, 192, 198)",
        paddingLeft:10,
        paddingRight:10,
        height: 35,
        flexDirection:"row",
        alignItems: 'center',
        borderRadius: 10,
    },
    searchIcon: {
        marginRight: 0,
        flex:1
    },
    input:{
        flex:8,
    },
})