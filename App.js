import { StyleSheet, Text, View, Button, StatuBar} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen, HomeStack} from "./screens/homescreen.js";
import CommunityScreen from "./screens/communityScreen.js";
import LoginScreen from './screens/loginScreen.js';
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from './screens/profileScreen.js';
import PostScreen from './screens/postScreen.js';

const Tab = createBottomTabNavigator();

function AppTabs(){
  return (
    <Tab.Navigator screenOptions={{
      headerStyle:{
      backgroundColor: "rgb(77, 140, 182)",
      height: 200,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      },
      headerTintColor: "rgb(255, 255, 255)"
    }}>
      <Tab.Screen 
      name="Home" 
      component={HomeStack} 
      options={{
        tabBarIcon:() => <Ionicons name="home-outline" size={24}/>, 
        headerShown:false,}
      }/>
      
      <Tab.Screen 
      name="Community" 
      component={CommunityScreen} 
      options={{tabBarIcon:() => <Ionicons name="globe-outline" size={24}/>,
      headerShown:false,}}/>
      
      <Tab.Screen 
        name="Post" 
        component={PostScreen} 
        options={{tabBarIcon:() => <Ionicons name="add-circle" size={24}/>,
        headerShown:false,}}/>

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
        tabBarIcon:() => <Ionicons name="person-outline" size={24}/>,
        headerShown:false}}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AppTabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
