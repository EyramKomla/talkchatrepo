import {StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import * as React from 'react';
import  FontAwesome  from '@expo/vector-icons/FontAwesome';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import Icon from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';
import { db } from '../firebase';
import { addDoc } from 'firebase/firestore';

  export default function CreateScreen({ navigation }){
    const [selectedValue, setSelectedValue] = React.useState("");
    const [searchText, setSearchText] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [bodyText, setBodyText] = React.useState("");
  
    return (
      <View style={altStyles.screenContainer}>
        <View style={altStyles.searchContainer}>
          
          <View style={altStyles.searchBar}>
            <TextInput
              style={altStyles.searchInput}
              placeholder="t/choose a community"
              value={searchText}
              onChangeText={setSearchText}
            />
            
          </View>

          <View style={altStyles.iconContainer}>
            <TouchableOpacity style={altStyles.icon}>
              <Icon name="menu-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={altStyles.icon}>
              <Icon name="link-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={altStyles.icon}>
              <Icon name="image-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={altStyles.icon}>
              <Icon name="videocam-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={altStyles.icon}>
            <FontAwesome6 name="bars-progress" size={24} color="black"/>
            </TouchableOpacity>
          </View>
          
          <View style={altStyles.richTextBoxContainer}>
            <TextInput
              style={[altStyles.richTextBox, altStyles.titleInput]}
              placeholder="An interesting title" // Updated placeholder
              value={title}
              onChangeText={setTitle}
              multiline={false}
            />
            <TextInput
              style={[altStyles.richTextBox, altStyles.bodyTextInput]}
              placeholder="Body text(optional)"
              value={bodyText}
              onChangeText={setBodyText}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={5} // Set a maximum number of lines
            />
          </View>
          
          <View style={altStyles.buttonContainer}>
            <TouchableOpacity style={altStyles.button}>
              <Text style={altStyles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        
        </View>
      </View>
    );
  };

styles = StyleSheet.create({
    container:{
        paddingTop:StatusBar.currentHeight,
        flex: 1,
        alignItems: "center",
    },
    header:{
        width:"100%",
        height: 70,
        flexDirection:"row",
    }
})


const altStyles = StyleSheet.create({
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
    },
    
    screenContainer: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingTop:StatusBar.currentHeight,
    },
    postContainer: {
      flex: 1,
      padding: 10,
    },
    searchContainer: {
      padding: 20,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: '#ffffff',
    },
    searchInput: {
      flex: 1,
      height: 40,
    },
    iconContainer: {
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-around',
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#f0f0f0',
    },
    richTextBoxContainer: {
      marginTop: 20,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 10,
    },
    richTextBox: {
      height: 200,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      padding: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
    button: {
      backgroundColor: 'rgb(124, 81, 163)',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
      marginLeft: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    titleInput: {
      marginBottom: 10,
      maxHeight: 50,
      fontWeight: 'bold',
      fontSize: 20,
    },
    bodyTextInput: {
      flex: 1,
      maxHeight: 150,
      fontWeight: 'bold',
    },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  button1: {
    backgroundColor: 'blueviolet',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5
  },
  });
  