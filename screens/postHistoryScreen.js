import {StatusBar, StyleSheet, Text, View, Button, Dimensions,ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';
import { ContentBox } from './expandedContentView';
import { useState,useEffect } from 'react';
import { db } from '../firebase';
import { userInformation } from '../App';
import { query,collection,getDocs,where, } from 'firebase/firestore';

export default function PostHistoryScreen(){

    const [userPosts, setUserPosts] = useState(null);

    useEffect(() =>{

        const fetchUserPost = async () => {
            try {
              // Reference to the collection
              const collectionRef = collection(db, "posts");
          
              // Create a query with the `where` method
              const q = query(collectionRef, where("authorUid", '==', userInformation.uid));
          
              // Fetch the documents that match the query
              const querySnapshot = await getDocs(q);
              const documents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setUserPosts(documents)
          
              console.log(documents);
            } catch (error) {
              console.error("Error fetching documents with condition:", error);
              throw error;
            }
          };
          fetchUserPost()
    },[])
    return (
        <View style={styles.container}>
            <View style={{
                width: '100%',
                height:50,
                borderBottomWidth:2,
                borderColor:'rgb(157, 148, 168)',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{color:'rgb(157, 148, 168)',fontSize:20}}>Posts</Text>
            </View>
            <FlatList style={{
                                width: "100%",
                            }}
                        data={userPosts}
                        keyExtractor={item => item.id}
                        renderItem={({item}) =>(
                            <ContentBox postImage={item.imageUrl} postMessage={item.body} username={item.authorName}/>
                        )}
            />
            
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        paddingTop:StatusBar.currentHeight,
        flex:1,
        alignItems: 'center',
    }
})