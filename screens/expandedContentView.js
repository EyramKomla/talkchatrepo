import { StyleSheet, Text, View, Button, Dimensions,ScrollView, StatusBar, Image} from 'react-native';
import { uniquePostData } from './homescreen';
import { useState } from 'react';
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import  FontAwesome  from '@expo/vector-icons/FontAwesome';

let profilePic = require("../assets/lofi-girl.png")
export default function ExpandedContentView(){
    return (
        <ScrollView style={styles.container}>
            <ContentBox postImage={uniquePostData.imageUrl} postMessage={uniquePostData.body} username={uniquePostData.authorName}/>
            <CommentsBox/>
        </ScrollView>
    )
}

function ContentBox({postPic, postImage, postMessage, username, wholeData}){
    const [likeStatus, setLikeStatus] = useState('white');
    return (
        <View style={{
            height: "auto",
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            paddingBottom:0,
            borderColor:"rgb(195, 188, 204)"
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
                        <Text style={{fontWeight:'600', color:"rgb(61, 64, 66)"}}>u/{username}</Text>
                    </View>
                </View>

                {/*Message*/}
                <View 
                    style={{
                        minHeight:40,
                        paddingLeft:15,
                        paddingRight:15,
                        paddingTop:10,
                    }}
                >
                    <Text style={{fontSize:16}}>{postMessage}</Text>
                </View>
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
                    <EvilIcons name="comment" size={20} /> 
                </View>
                <View style={styles.uxButton}>
                    <FontAwesome name="share-square-o" size={16} /> 
                </View>
            </View>
        </View>
    )
}

function CommentsBox(){
    return (
        <View style={{
            width:"100%",
            height:100,
        }}>
            <View style={{
                width:"100%",
                height:50,
                borderBottomWidth:1,
                borderColor: "rgb(195, 188, 204)",
                alignItems:"center",
                justifyContent:"flex-end"
            }}>
                <Text style={{
                    fontSize:20,
                    color: "rgb(195, 188, 204)",
                }}>Comments</Text>
            </View>
        </View>
    )
}

const styles={
    container:{
        flex:1,
        paddingTop:StatusBar.currentHeight,
    },
    contentBoxStyle:{
        width:"100%",
        height:"auto",
    },
    uxButton:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    }
}