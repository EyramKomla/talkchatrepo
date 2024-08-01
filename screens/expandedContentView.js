import { StyleSheet, Text, View, Button, Dimensions,ScrollView, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import { uniquePostData } from './homescreen';
import { useState, useEffect } from 'react';
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import  FontAwesome  from '@expo/vector-icons/FontAwesome';
import { talkchatTint } from './profileScreen';
import { onSnapshot,doc,collection } from 'firebase/firestore';
import { db } from '../firebase';



let profilePic = require("../assets/lofi-girl.png")
export default function ExpandedContentView({navigation}){

    const [commentsData, setCommentsData] = useState(null);
    const [commentsNumber, setCommentsNumber] = useState("0");

    let postRef = doc(collection(db,"posts"), uniquePostData.id);
    let commentsRef = collection(postRef,"comments") 

    {/*for fetching comments*/}
    useEffect(() => {
        const unsubscribe = onSnapshot(commentsRef, (snapshot) =>{
                                let data = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
                                setCommentsData(data)
                                setCommentsNumber(data.length)
                                data.forEach((item)=>console.log(item.comment));
                            })
          
    
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      }, []);
      
    return (
        <>
            <View style={styles.container}>
                <ContentBox commentNumber={commentsNumber} postImage={uniquePostData.imageUrl} postMessage={uniquePostData.body} username={uniquePostData.authorName}/>
                
                    {/*Comments*/}
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

                    <FlatList style={{
                                    width: "100%",
                                }}
                        data={commentsData}
                        keyExtractor={item => item.id}
                        renderItem={({item}) =>(
                            <View style={{
                                padding:10,
                                width: '100%',
                                height:'auto',
                            }}>
                                <View style={{
                                    flexDirection:'row', 
                                    justifyContent:'flex-start',
                                    alignItems: 'center', 
                                    height:35, 
                                    width:'100%',
                                }}>
                                    <Image source={require("../assets/lofi-girl.png")}
                                        style={{
                                            height:30,
                                            width:30,
                                            borderRadius:100,
                                            marginRight:10,
                                        }}
                                    />
                                    <Text>u/{item.authorUsername}</Text>
                                </View>
                                <Text>{item.comment}</Text>
                            </View>
                    )}/>

            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CommentView')}
                style={{
                    width:'90%',
                    margin:'auto',
                    height:35,
                    position:'static',
                    bottom:0,
                    borderRadius:10,
                    backgroundColor:'rgb(197, 188, 208)',
                    paddingLeft:5,
                    paddingRight:5,
                    justifyContent: 'center',
                }}
            >
                <Text>Add a comment</Text>
            </TouchableOpacity>
        </>
    )
}

export function ContentBox({postPic, postImage, postMessage, username, wholeData, commentNumber}){
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
                        <AntDesign name="hearto" size={16} color='rgb(157, 148, 168)'
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
                <View style={[styles.uxButton]}>
                    <FontAwesome name="comments-o" size={20} color='rgb(157, 148, 168)'/> 
                    {commentNumber && <Text style={{marginLeft:5,color:'rgb(157, 148, 168)'}}>{commentNumber}</Text>}
                </View>
                <View style={styles.uxButton}>
                    <FontAwesome name="share-square-o" size={16} color='rgb(157, 148, 168)'/> 
                </View>
            </View>
        </View>
    )
}



const styles=StyleSheet.create({
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
})