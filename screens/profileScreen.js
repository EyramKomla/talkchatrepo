import {StatusBar, StyleSheet, Text, View, Button, Dimensions,ScrollView, Image, TouchableOpacity} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { userInformation } from '../App';
import ProfileEditScreen from './profileEditScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const talkchatTint = 'rgb(124, 81, 163)';
const Stack = createNativeStackNavigator()

export function ProfileScreenStack(){
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
        }}>
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}/>
            <Stack.Screen
                name='EditScreen'
                component={ProfileEditScreen}/>
        </Stack.Navigator>
    )
}

export default function ProfileScreen({navigation}){
    const signOut = async () =>{
        try{
            await auth.signOut();
        }catch(e){
            alert("Error signing out: " + e.message);
        }
    }
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
                    <Text style={{
                        fontSize: 24,
                        fontWeight:'600',
                    }}>u/{userInformation.displayName}</Text>

                    <Text style={{
                        fontSize: 14,
                        color: "grey"
                    }}>Someone said something</Text>
                </View>


                <View style={{
                    width:"100%"
                }}>
                    {/*Profile Tab*/}
                    <TouchableOpacity onPress={() => navigation.navigate('EditScreen')}
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
                            <Ionicons name='person-circle-sharp' size={28}/>
                        </View>
                        <View style={{
                            flex: 6,
                        }}>
                            <Text style={{
                                fontSize:16,
                                fontWeight:'600'
                            }}>My Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <ProfileScreenOption icon="gift" text="Get Premium"/>
                    <ProfileScreenOption icon="stats-chart" text="History"/>
                    <ProfileScreenOption icon="bookmark-outline" text="Saved"/>
                </View>


                <View style={{
                    width: "100%",
                    height: 60,
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    
                    <BottomButton text="Settings" icon="settings-outline"/>
                    <TouchableOpacity onPress={() => signOut()}
                        style={{
                            flex: 1,
                            paddingLeft: 30,
                            flexDirection: "row",
                            alignItems: 'center',
                            }}
                    >
                        <View>
                            <Ionicons name="log-out-outline" size={24}/>
                        </View>
                        <View style={{paddingLeft:10}}>
                            <Text style={{
                                fontSize: 16,
                            }}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                
            </View>
        </View>
    );
}

function ProfileScreenOption({icon, text}){
    return (
        <View style={{
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
                <Ionicons name={icon} size={28}/>
            </View>
            <View style={{
                flex: 6,
            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'600'
                }}>{text}</Text>
            </View>
        </View>
    );
}

function BottomButton({text, icon}){
    return (
        <TouchableOpacity style={{
            flex: 1,
            paddingLeft: 30,
            flexDirection: "row",
            alignItems: 'center',
            }}>
            <View>
                <Ionicons name={icon} size={24}/>
            </View>
            <View style={{paddingLeft:10}}>
                <Text style={{
                    fontSize: 16,
                }}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        backgroundColor: talkchatTint,
        alignItems: "center",
    }
});