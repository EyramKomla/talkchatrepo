import {StatusBar, StyleSheet, Text, View, Button, Dimensions,ScrollView, Image} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileScreen(){
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
                    }}>u/TalkChatStaff</Text>

                    <Text style={{
                        fontSize: 14,
                        color: "grey"
                    }}>Someone said something</Text>
                </View>


                <View style={{
                    width:"100%"
                }}>
                    <ProfileScreenOption icon="person-circle-sharp" text="My profile"/>
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
                    <BottomButton text="Log Out" icon="log-out-outline"/>
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
        <View style={{
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
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        backgroundColor: "rgb(77, 140, 182)",
        alignItems: "center",
    }
});