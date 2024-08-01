import { StyleSheet, Text, View, Button, Dimensions,ScrollView, StatusBar, Image, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { addDoc, doc, collection, onSnapshot } from 'firebase/firestore';
import { talkchatTint } from './profileScreen';
import { db } from '../firebase';
import { uniquePostData } from './homescreen';
import { useState } from 'react';
import { userDetails } from './profileScreen';
import { userInformation } from '../App';


export default function CommentScreen(){
    
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    let postRef = doc(collection(db,"posts"), uniquePostData.id);
    let commentsRef = collection(postRef,"comments") 
    
    {/*for adding comments*/}
    const addComment = async () =>{
        try{
            setLoading(true);
            await addDoc(commentsRef,{
                comment:comment,
                authorUid:userInformation.uid,
                authorUsername:userInformation.displayName,
            })
            setLoading(false);
            alert('Added comment')
        }catch(error){
            alert(error.message)
        }
    }


    return (
        <View style={styles.container}>
            <TextInput onChangeText={(text) => setComment(text)} multiline placeholder='Add a comment' 
                style={{
                    width:'100%',
                    height:135,
                    padding:10
                }}
            />
            {loading ? <ActivityIndicator size="small" color="purple"/> :
                <TouchableOpacity onPress={addComment}
                    style={{
                        position:'absolute',
                        bottom:10,
                        left:10,
                        backgroundColor:talkchatTint,
                        width:55,
                        height:30,
                        borderRadius:10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{color:'white'}}>Post</Text>
                </TouchableOpacity>
            }
            <AntDesign name='picture' size={30} style={{position:'absolute',bottom:10,right:10}}/>
        </View>
    )
}

styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
    }
})