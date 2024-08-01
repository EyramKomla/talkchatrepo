import { StyleSheet, Text, View, Button, StatuBar} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen, HomeStack} from "./screens/homescreen.js";
import CommunityScreen from "./screens/communityScreen.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import {ProfileScreenStack} from './screens/profileScreen.js'
import CreateScreen from './screens/postScreen.js';
import {SignUpStack} from './screens/signUpScreen.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import { useState, useEffect } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        headerShown:false,
      }
      }/>
      
      <Tab.Screen 
      name="Community" 
      component={CommunityScreen} 
      options={{tabBarIcon:() => <Ionicons name="globe-outline" size={24}/>,
      headerShown:false,}}/>
      
      <Tab.Screen 
        name="Post" 
        component={CreateScreen} 
        options={{tabBarIcon:() => <Ionicons name="add-circle" size={24}/>,
        headerShown:false,}}/>

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreenStack} 
        options={{
        tabBarIcon:() => <Ionicons name="person-outline" size={24}/>,
        headerShown:false}}/>
    </Tab.Navigator>
  )
}

function AuthTabs(){
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="Sign Up Screen" component={SignUpStack}/>
    </Stack.Navigator>
  );
}

export let userInformation;
export default function App() {
  const [userInfo, setUserInfo] = useState(null)
  const userHandler = (user) => user ? setUserInfo(user) : setUserInfo(null);
  userInformation = userInfo;

  useEffect((
    () => auth.onAuthStateChanged((user) => userHandler(user))
  ), [])
  userInfo ? console.log(userInfo) : console.log("Not logged in yet");
  return (
    <NavigationContainer>
      {userInfo ? <AppTabs/> : <AuthTabs/>}
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
