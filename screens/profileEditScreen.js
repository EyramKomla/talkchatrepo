import {StatusBar, StyleSheet, Text, View, Button, Dimensions,ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { userInformation } from '../App';
import { db } from '../firebase';
import { updateDoc,doc } from 'firebase/firestore';
import { useState } from 'react';



export default function ProfileEditScreen(){
    const[loading,setLoading]=useState('')
    const[bio,setBio] = useState('')

    const updateBio = async() =>{
        try{
            console.log(userInformation)
            setLoading(true)
            await updateDoc(doc(db,'users',userInformation.uid), {
                bio: bio
            })
            setLoading(false)
            alert('Edit successfully')
        }catch(error){
            alert('Edit failed: ' + error.message)
        }
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <ScrollView style={{
                flex:1,
                width:'100%'
            }}>

                <View style={{
                    width:'100%',
                    height:400,
                    paddingLeft:20,
                    paddingRight:20,
                    justifyContent: 'flex-end',
                    backgroundColor:'rgb(124, 81, 163)',
                    borderBottomLeftRadius:30,
                    borderBottomRightRadius:30,
                }}>
                    <View style={{
                        height:100,
                        width:'100%',
                        flexDirection:'row',
                        alignItems: 'center',
                    }}>
                        <Image source={require("../assets/profilepic.png")} 
                                style={{
                                    resizeMode:"contain",
                                    width:100, 
                                    height:100,
                                    borderTopLeftRadius: 10, 
                                    borderTopRightRadius: 10, 
                                    borderBottomRightRadius: 10, 
                                    borderBottomLeftRadius: 10,
                                    marginRight:20,
                                }}
                        />
                        <View>
                            <Text style={{
                                fontSize:24,
                                fontWeight:'600',
                                color:'#FFDAB9',
                            }}>u/{userInformation.displayName}</Text>
                            <Text style={{
                                color:'#DCC6E0',
                                width:200,
                            }}>{userInformation.bio}</Text>
                        </View>

                    </View>

                </View>
                
                {/*bio editting view*/}
                <TextInput onChangeText={(text) => setBio(text)} placeholder='Say something about yourself...not too much though' multiline style={{
                    padding:10,
                    width:'90%',
                    height:250,
                    backgroundColor:'rgb(115, 110, 119)',
                    margin:'auto',
                    marginTop:20,
                    borderRadius:15,
                }}/>

                {loading ? (<ActivityIndicator size='small' color='purple'/>) :
                    <TouchableOpacity onPress={updateBio} style={{
                        width:70,
                        height:40,
                        marginTop:20,
                        marginLeft:20,
                        borderRadius:25,
                        backgroundColor:'rgb(124, 81, 163)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize:16,
                            color:'white',
                        }}>Edit Bio</Text>
                    </TouchableOpacity>
                }
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    }
})