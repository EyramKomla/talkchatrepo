import { StyleSheet, Text, View, Button, Dimensions,ScrollView, StatusBar, Image, TextInput, FlatList} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useRef, useEffect } from 'react';
import  FontAwesome  from '@expo/vector-icons/FontAwesome';
import { collection, getDocs, where, doc } from 'firebase/firestore';
import { db } from '../firebase';
import AntDesign from "@expo/vector-icons/AntDesign"

export default function SearchScreen(){

    let collectionRef=collection(db,"users");
    const [data, setData] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async() =>{
            try{
                const querySnapshot = await getDocs(collectionRef);
                const queryDocs = querySnapshot.docs.map(item => ({id:item.id, ...item.data()}));
                setData(queryDocs); 
            }catch(error){
                alert("Error: " + error.message);
            }
        }

        fetchData()


    },[])
    
    

    return (
        <View style={{
                flex:1,
                alignItems: 'center',
                paddingTop: 35,
            }}>
            <View
                style={{
                    width:'90%',
                    height:35,
                    alignItems: 'center',
                    flexDirection:'row',
                    backgroundColor:'rgb(197, 188, 208)',
                    borderRadius:10,
                    paddingLeft:5,
                    paddingRight:5,
                    marginBottom:30,
                }}
            >
                <AntDesign name="search1" size={20}/>
                <TextInput onChangeText={(text)=>setSearchText(text)} style={{flex:1, marginRight:10}} placeholder='Who are you looking for'/>
            </View>
            <FlatList style={{
                                width: "100%",
                            }}
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => {
                            // if(searchText == item.username){
                                return (
                                    <View style={{
                                        width: "100%",
                                        height: 45,
                                        flexDirection:'row',
                                        alignItems: "center",
                                        marginBottom:5,
                                        paddingLeft:10,
                                        paddingRight:10,
                                    }}>
                                        <Image source={require("../assets/lofi-girl.png")} style={{
                                            height:40,
                                            width:40,
                                            borderRadius:100,
                                            marginRight:10,
                                        }}/>
                                        <Text>u/{item.username}</Text>
                                    </View>
                                )
                            }
                            }     
                        // }
            />
        </View>
    )
}


styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        paddingTop: 35,
    },
})