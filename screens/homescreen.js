import { 
    StyleSheet, 
    Text, 
    View, 
    Dimensions,
    StatusBar, 
    Image, 
    TouchableOpacity, 
    TextInput, 
    SafeAreaView, 
    FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "@expo/vector-icons/Ionicons";
import  FontAwesome  from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons'
import AntDesign from '@expo/vector-icons/AntDesign';
import ExpandedContentView from './expandedContentView';
import SearchScreen from './searchScreen';
import { useState } from 'react';
import { where, collection, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import CommentScreen from './commentScreen';
import OtherUserDetPage from './otherUserDetPage';
import OtherUserPostPage from './otherUserPostPage';

const Stack = createNativeStackNavigator();
export let uniquePostData = {};
export let uniqueUserData = {};


export function HomeStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
                name="HomeScreen" 
                component={HomeScreen}
                options={{headerTitle:""}}/>
            <Stack.Screen 
                name="ExpandedContentView"
                component={ExpandedContentView} 
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
            />
            <Stack.Screen 
                name="CommentView"
                component={CommentScreen}
                options={{
                    headerShown:true,
                    headerTitle:'Add comment',
                }} 
            />
            <Stack.Screen 
                name="OtherUserDetPage"
                component={OtherUserDetPage} 
            />
            <Stack.Screen 
                name="OtherUserPostPage"
                component={OtherUserPostPage} 
            />
        </Stack.Navigator>
        
    );
}

export let otherUserUid;

export default function HomeScreen({navigation}){
    // const getDocuments = async() =>{
    //     let snapshot  = await getDocs(collection(db, "posts"))
    //     snapshot.forEach((doc) =>{
    //         console.log(doc.data())
    //     });
    // }
    const [postData, setPostData] = useState("");

    onSnapshot(collection(db, "posts"), (snapshot) =>{
       let data = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))
        setPostData(data)    
    })
    
    

    return(
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}/>
            <FlatList style={styles.scrollView}
                data={postData}
                keyExtractor={item => item.id}
                renderItem={({item}) =>(
                    <ContentBox wholeData={{...item}} navigation={navigation} postImage={item.imageUrl} postMessage={item.body} username={item.authorName} uid={item.authorUid}/>
            )}/>
        </SafeAreaView>
    )
}

//Variables
let profilePic = require("../assets/lofi-girl.png")


//Custom Components
function ContentBox({navigation, postPic, postImage, postMessage, username, wholeData, uid}){
    const [likeStatus, setLikeStatus] = useState('white');
    return (
        <View style={{
            height: "auto",
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            paddingBottom:0,
            borderColor:"rgb(195, 188, 204)",
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
                    paddingLeft:5,
                    paddingTop:10,
                }}>

                    {/*Profile picture view*/}
                    <TouchableOpacity onPress={() =>{
                        navigation.navigate("OtherUserDetPage");
                        otherUserUid = {uid}
                        console.log(otherUserUid)

                    }} style={{
                        flex: 1,
                        justifyContent:"center",
                        alignItems: "center",
                    }}>
                        <Image source={profilePic} style={{
                            width: 35, 
                            height:35, 
                            backgroundColor:"red",
                            borderRadius:100,}}/>
                    </TouchableOpacity>

                    {/*Username*/}
                    <View style={{
                        flex: 6,
                        justifyContent: 'center',
                    }}>
                        <Text style={{fontWeight:'600', color:"rgb(61, 64, 66)"}}>u/{username}</Text>
                    </View>
                </View>

                {/*Message*/}
                <TouchableOpacity 
                    style={{
                        minHeight:40,
                        paddingLeft:15,
                        paddingRight:15,
                        paddingTop:10,
                    }}
                    onPress={() =>{
                        uniquePostData = wholeData;
                        navigation.navigate("ExpandedContentView");
                    }}
                >
                    <Text style={{fontSize:16}}>{postMessage}</Text>
                </TouchableOpacity>
            </View>

            {/*Post Image View*/}
            
            {postImage &&
                <View style={{
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
            }}>
                    <Image resizeMode="cover" source={{uri:postImage}} style={{
                    borderRadius: 10,
                    width:"100%",
                    height:"100%",
                }}/>
            </View>
            }

            {/* Likes, Comments and Forwards */}
            <View style={{
                width: '100%',
                height: 30,
                flexDirection:"row",
            }}
            >
                <View style={styles.uxButton}>
                    {
                        likeStatus === 'white' ? 
                        <AntDesign name="hearto" size={16} 
                            onPress={() =>{
                                if(likeStatus === 'white'){
                                    setLikeStatus('red')
                                }
                        }}/> :
                        <AntDesign name="heart" size={16} color='red'
                            onPress={() =>{
                                if(likeStatus === 'red'){
                                    setLikeStatus('white')
                                }
                        }}/>
                    }
                </View>
                <View style={styles.uxButton}>
                    <FontAwesome name="comments-o" size={20} /> 
                </View>
                <View style={styles.uxButton}>
                    <FontAwesome name="share-square-o" size={16} /> 
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
    searchContainer:{
        width:Dimensions.get('window').width * 0.75,
        backgroundColor: "rgb(183, 192, 198)",
        paddingLeft:10,
        paddingRight:10,
        height: 35,
        flexDirection:"row",
        alignItems: 'center',
        borderRadius: 10,
    },
    searchIcon: {
        marginRight: 0,
        flex:1
    },
    input:{
        flex:8,
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