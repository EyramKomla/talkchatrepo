import {StatusBar, StyleSheet, Text, View, Button, Dimensions,ScrollView, Image, TouchableOpacity} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { userInformation } from '../App';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDoc, doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { otherUserUid } from './homescreen';

export const talkchatTint = 'rgb(124, 81, 163)';
export let userDetails;

const Stack = createNativeStackNavigator()


export default function OtherUserDetPage({navigation}){
    
    const signOut = async () =>{
        try{
            await auth.signOut();
        }catch(e){
            alert("Error signing out: " + e.message);
        }
    }
    const [document, setDocument] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null)

    if(document){
        userDetails = document;
    }


    useEffect(() => {
        const docRef = doc(db, 'users', otherUserUid.uid);
    
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = { id: docSnapshot.id, ...docSnapshot.data() };
                setDocument(data);
                setLoading(false);
              } else {
                setError('No such document!');
                setLoading(false);
              }
        }, (error) => {
          console.error("Error fetching document: ", error);
          setError(`Error fetching document: ${error.message}`);
          setLoading(false);
        });
    
        // Clean up the subscription on unmount
        return () => unsubscribe();
      }, []);

    return(

        <View style={styles.profileContainer}>
            <View style={{
                width: "100%",
                height: Dimensions.get("window").height/3,
                justifyContent: "flex-end",
                alignItems: "center",
            }}>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    }}>
                        <Image source={require("../assets/profilepic.png")} 
                            style={{
                                resizeMode:"contain",
                                width:100, 
                                height:100,
                                borderTopLeftRadius: 10, 
                                borderTopRightRadius: 10, 
                                borderBottomRightRadius: 10, 
                                borderBottomLeftRadius: 10,}}/>
                    </View>
            </View>
                
            <View style={{
                flex: 1,
                alignItems: "center",
                backgroundColor:"white",
                paddingTop: 55,
                borderTopLeftRadius: 20, 
                borderTopRightRadius: 20, 
            }}>


                <View style={{
                    width: "100%",
                    height:100,
                    alignItems: "center",
                }}>
                    {document ?
                        <Text style={{
                            fontSize: 24,
                            fontWeight:'600',
                        }}>
                            u/{document.username}
                        </Text> :
                        <Text style={{
                            fontSize: 24,
                            fontWeight:'600',
                        }}>
                            u/{userInformation.displayName}
                        </Text>
                    }

                    {document ? 
                        <Text style={{
                            fontSize: 14,
                            color: "grey"
                        }}>{document.bio}</Text> :
                        <Text style={{
                            fontSize: 14,
                            color: "grey"
                        }}>Someone said something</Text>
                    }
                </View>


                <View style={{
                    width:"100%"
                }}>
                    {/*Post tab*/}
                    <TouchableOpacity onPress={() => navigation.navigate('OtherUserPostPage')}
                        style={{
                        width: "100%",
                        height: 40,
                        alignItems: "center",
                        flexDirection:"row",
                        paddingLeft: 20,
                        paddingRight: 20,
                        marginBottom:10,
                        }}>
                        <View style={{
                            flex:1,
                        }}>
                            <AntDesign name='book' size={28}/>
                        </View>
                        <View style={{
                            flex: 6,
                        }}>
                            <Text style={{
                                fontSize:16,
                                fontWeight:'600'
                            }}>Posts</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        backgroundColor: talkchatTint,
        alignItems: "center",
    }
});