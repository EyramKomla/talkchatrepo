import { StyleSheet, Text, View, Button, Dimensions,ScrollView, StatusBar, Image, TouchableOpacity, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "@expo/vector-icons/Ionicons";
import  FontAwesome  from '@expo/vector-icons/FontAwesome';
import LoginScreen from './loginScreen';
import ExpandedContentView from './expandedContentView';
import SearchScreen from './searchScreen';
import { SearchBar } from './searchScreen';

const Stack = createNativeStackNavigator();


export function HomeStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen 
                name="LoginScreen" 
                component={LoginScreen}
            />
            <Stack.Screen 
                name="ExpandedContentView"
                component={ExpandedContentView} 
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerShown:true,
                    headerTitle: props => <SearchBar placeHolder="What are you looking for"/>,
                    headerStyle:{
                        marginRight:10,
                    },
                    headerTitleStyle:{
                        fontSize:14,
                    },
                }}
            />
        </Stack.Navigator>
        
    );
}
export default function HomeScreen({navigation}){
    return(
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <ScrollView style={styles.scrollView}>
                <ContentBox navigation={navigation} profilePic={profilePic} postImage={imagePost} postMessage={postMessage}/>        
                <ContentBox navigation={navigation} profilePic={profilePic} postImage={imagePost} postMessage={postMessage}/>        
                <ContentBox navigation={navigation} profilePic={profilePic} postImage={imagePost} postMessage={postMessage}/>        
                <ContentBox navigation={navigation} profilePic={profilePic} postImage={imagePost} postMessage={postMessage}/>        
                <ContentBox navigation={navigation} profilePic={profilePic} postImage={imagePost} postMessage={postMessage}/>        
                <ContentBox navigation={navigation} profilePic={profilePic} postImage={imagePost} postMessage={postMessage}/>        
                <ContentBox navigation={navigation} profilePic={profilePic} postImage={imagePost} postMessage={postMessage}/>        
               
                <Button title="Login" onPress={() => navigation.navigate("LoginScreen")}/>   
            </ScrollView>
        </View>
    )
}

//Variables
let profilePic = require("../assets/lofi-girl.png")
let imagePost = require("../assets/profilepic.png")
let postMessage = "Someone said something about that one person sitting on the car"
let heartBackground = "red"

//Custom Components
function ContentBox({navigation, profilePic, postImage, postMessage}){
    return (
        <View style={{
            height: "auto",
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            paddingBottom:15,
            borderColor:"rgb(0 0 0)"
        }}>
            {/*Profile picture, username, message content*/}
            <View style={{
                width: '100%',
                height: "auto",
                paddingTop:5,
            }}>
                <View style={{
                    height: 35,
                    flexDirection:"row",
                }}>

                    {/*Profile picture view*/}
                    <View style={{
                        flex: 1,
                        justifyContent:"center",
                        alignItems: "center",
                    }}>
                        <Image source={profilePic} style={{
                            width: 35, 
                            height:35, 
                            backgroundColor:"red",
                            borderRadius:100,}}/>
                    </View>

                    {/*Username*/}
                    <View style={{
                        flex: 6,
                        justifyContent: 'center',
                    }}>
                        <Text style={{fontWeight:'600', color:"rgb(61, 64, 66)"}}>r/TalkChatForum</Text>
                    </View>
                </View>

                {/*Message*/}
                <TouchableOpacity 
                    style={{
                        minHeight:50,
                        padding:10,
                    }}
                    onPress={() => navigation.navigate("ExpandedContentView")}
                >
                    <Text style={{fontSize:16}}>{postMessage}</Text>
                </TouchableOpacity>
            </View>

            {/*Post Image View*/}
            <View style={{
                width: '100%',
                height: 250,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
            }}>
                <Image source={postImage} style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10
                }}/>
            </View>

            {/* Likes, Comments and Forwards */}
            <View style={{
                width: '100%',
                height: 30,
                flexDirection:"row",
            }}
            >
                <View style={styles.uxButton}>
                    <FontAwesome name="heart" size={20} color = {heartBackground}
                    onPress={() => heartBackground="white"}/> 
                </View>
                <View style={styles.uxButton}>
                    <FontAwesome name="comment-o" size={20} /> 
                </View>
                <View style={styles.uxButton}>
                    <FontAwesome name="share-square-o" size={20} /> 
                </View>
            </View>
        </View>
    )
}

function Header({navigation}){
    return (
        <View style={styles.header}>
            <View style={[styles.headerView, {alignItems:"flex-start"}]}>
                <Ionicons name="menu" size={24} style={{color:"rgb(61, 64, 66)"}}/>
            </View>

            <View style={[styles.headerView, {alignItems:'center'}]}>
                <Image source={require("../assets/talkchat-logo.jpg")}
                style={{
                    width:"70%",
                    height:"70%",
                }}/>
            </View>

            <View style={[styles.headerView, {alignItems:'flex-end'}]}>
                <Ionicons name="search" size={24} style={{color:"rgb(61, 64, 66)"}} onPress={() => navigation.navigate("SearchScreen")}/>
            </View>
        </View>
    )
}


//Component Styling
const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        alignItems: 'center',
    },
    
    
    header:{
        height: 100,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    headerView:{
        flex:1,
        height: '100%',
        justifyContent: 'center',
    },
    scrollView:{
        flex: 1,
        width: "100%"
    },
    uxButton:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    }
})