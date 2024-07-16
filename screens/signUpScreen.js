import { StyleSheet, Text, View, Button, Dimensions,ScrollView, CheckBox, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './signInScreen';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { Firestore, setDoc, doc, addDoc, collection } from 'firebase/firestore';

const Stack = createNativeStackNavigator();


export function SignUpStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    headerShown:true,
                    headerTitle: "Sign In",
                    headerTintColor:"purple",
                }}
            />
        </Stack.Navigator>
    );
}

export default function SignUpScreen({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [loading, setLoading] = useState(false);
    const appAuth = auth;

    const signUp = async () =>{
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(appAuth, email, password);
            const userDet = response.user
            await addDoc(collection(db, "users"), {
                username: username,
                email: email,
            })
            alert("Account created successfully ")
            console.log(response);
        }catch(error){
            console.log(error);
            alert('Sign up failed: ' + error.message)
        }finally{
            setLoading(false);
        }

        

    }
    
    
    return (
        <KeyboardAvoidingView style={styles.SignUpContainer}>
            <Image source={require('../assets/talkchat-logo.jpg')} style={{width:100, height: 100,}}/>

            <View style={{gap:10, width:"100%", alignItems:'center'}}>
                {/*Sign up and start talking*/}
                <Text style={{
                    color:'rgb(124, 81, 163)',
                    fontSize:20,
                    fontWeight:"600",
                }}>Sign up and start talking</Text>
                
                {/* email */}
                <TextInput style={{
                    width:'90%',
                    height: 50,
                    borderRadius:20,
                    paddingLeft: 20,
                    borderWidth: 1,
                }} placeholder='Input your email' autoCapitalize='none' onChangeText={(text) => setEmail(text)} value={email}/>
                
                {/*password*/}
                <TextInput style={{
                    width:'90%',
                    height: 50,
                    borderRadius:20,
                    paddingLeft: 20,
                    borderWidth: 1,
                }} placeholder='Input your password' secureTextEntry={true} autoCapitalize='none' onChangeText={(text) => setPassword(text)} value={password}/>
                
                {/*username*/}
                <TextInput style={{
                    width:'90%',
                    height: 50,
                    borderRadius:20,
                    paddingLeft: 20,
                    borderWidth: 1,
                }} placeholder='Choose a username' autoCapitalize='none' onChangeText={(text) => setUsername(text)} value={username}/>
                
                {/*sign in button*/}
                {loading ? <ActivityIndicator size="large"  color="purple"/> :
                    <TouchableOpacity style={{
                        borderWidth:1,
                        height:30,
                        width: 60,
                        borderRadius:10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:'#988fb5'
                    }}
                        onPress={() => signUp()}>
                        <Text>Sign up</Text>
                    </TouchableOpacity>
                }
            </View>

            <View style={{
                width:"100%",
                alignItems:"center",
                alignSelf:"flex",
                borderBottomWidth: 1,}}>
                <Text>By continuing, you agree to our <Text style={{fontWeight:"bold"}}>User Agreement</Text> and ackownledge that you understand the <Text style={{fontWeight:"bold"}}>Privacy Policy</Text></Text>
               
                <View style={{
                    flexDirection:"row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopWidth:1,
                    width:"100%",
                    height:30,
                }}>
                    <Text style={{alignItems:"center"}}>Already have an account?</Text>
                    <SignInButton navigation={navigation}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

function SignInButton({navigation}){
    return (
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={{
            paddingLeft:10,
            paddingRight:10,
            marginLeft:10,
            borderRadius:5,
            borderWidth:1,
            borderColor:"rgb(84, 18, 146)",
        }}>
            <Text>Sign In</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    SignUpContainer:{
        flex:1,
        backgroundColor:"rgb(241, 242, 244)",
        paddingTop: 100,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: "space-between",
    }
})