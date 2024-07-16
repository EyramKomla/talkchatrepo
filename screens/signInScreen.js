import { StyleSheet, Text, View, Button, Dimensions,ScrollView, StatusBar, Image, TouchableOpacity, TextInput, SafeAreaView, ActivityIndicator} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import  FontAwesome  from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const talkchatTint = 'rgb(124, 81, 163)';


export default function SignInScreen({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signIn = async () =>{
        setLoading(true);
        try{
            response = await signInWithEmailAndPassword(auth, email, password);
            alert('Sign in successful')
            console.log(response["_tokenResponse"].email);
        }catch(error){
            console.log(error);
            alert('Error: ' + error.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>

            <Image source={require("../assets/talkchat-logo.jpg")} style={{height:100, width:100, marginTop:100, marginBottom:100}}/>
            
            <Text style={{
                marginBottom:5,
                fontSize:25,
                fontWeight:"600",
                color: talkchatTint,
            }}>Login</Text>
            
            <TextInput placeholder="What's your email address" onChangeText={(text) => setEmail(text)} 
                style={{
                    width:"90%",
                    height:50,
                    borderRadius:20,
                    borderWidth:1,
                    marginBottom:10,
                    paddingLeft:10,
                }}
            />
            <TextInput placeholder="Input your password" secureTextEntry={true} onChangeText={(text) => setPassword(text)}
                style={{
                    width:"90%",
                    height:50,
                    borderRadius:20,
                    borderWidth:1,
                    paddingLeft:10,
                }}
            />
            {loading ? <ActivityIndicator size='large' color='purple'/> :
                <TouchableOpacity onPress={() => signIn()} 
                    style={{
                        width:60,
                        height:30,
                        borderRadius:10,
                        marginTop:5,
                        borderWidth:1,
                        borderColor:"rgb(84, 18, 146)",
                        backgroundColor:'#988fb5',
                        justifyContent:"center",
                        alignItems: "center",
                    }}
                >
                    <Text>Sign In</Text>
                </TouchableOpacity>
            }


        </View>
    );
}

styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    }
});