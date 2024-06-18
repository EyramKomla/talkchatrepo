import {StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import  FontAwesome  from '@expo/vector-icons/FontAwesome';
import  Ionicons  from '@expo/vector-icons/Ionicons';

export default function CommunityScreen(){
    return(
        <View style={styles.container}>
            <Header/>
            <Topics/>
            <TopCommunities/>
        </View>
    )
}

//Cusotm Components
function Header(){
    return (
        <View style={styles.header}>
            <View style={{
                flex:1,
                paddingLeft:10,
                flexDirection: "row",
                alignItems: 'center',
            }}>
                <Ionicons name="menu" size={25}/>
            </View>
            <View style={{
                flex:4,
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize:18,
                    fontWeight: '600',
                    color:"purple",
                }}>Communities</Text>
            </View>
            <View style={{
                flex:1,
                paddingRight:10,
                flexDirection:"row",
                justifyContent:"flex-end",
                alignItems:"center",
            }}>
                <Ionicons name="search" size={25}/>
            </View>
        </View>
    );
}

function Topics(){
    return (
        <View style={{width:"100%"}}>
            <View style={{
                width: "100%",
                height: 30,
                paddingLeft: 10,
            }}>
                <Text style={{fontSize:14, fontWeight:"600"}}>Explore communities by topic</Text>
            </View>
            <ScrollView horizontal={true} 
                        style={{
                            width: "100%",
                            height: "auto",
                            paddingLeft: 10,
                            paddingRight:10,
                            }}
                        showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity style={{
                    height: 50,
                    width:"auto",
                    borderWidth: 2,
                    borderColor: "rgb(120, 126, 130)",
                    borderRadius:35,
                    padding:10,
                    marginRight:10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                    <Text>Something</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    height: 50,
                    width:"auto",
                    borderWidth: 2,
                    borderColor: "rgb(120, 126, 130)",
                    borderRadius:35,
                    padding:10,
                    marginRight:10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                    <Text>Something</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    height: 50,
                    width:"auto",
                    borderWidth: 2,
                    borderColor: "rgb(120, 126, 130)",
                    borderRadius:35,
                    padding:10,
                    marginRight:10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                    <Text>Something</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    height: 50,
                    width:"auto",
                    borderWidth: 2,
                    borderColor: "rgb(120, 126, 130)",
                    borderRadius:35,
                    padding:10,
                    marginRight:10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                    <Text>Something</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

function TopCommunities(){
    return (
        <View style={{width:"100%", paddingLeft:10,}}>
            <View style={{width:"100%", height:30,}}>
                <Text style={{fontSize:16, fontWeight:"600",}}>Top Communities</Text>
            </View>
            <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            width:"100%"
                        }}>
                <CommunityContentBox/>
                <CommunityContentBox/>
                <CommunityContentBox/>
                <CommunityContentBox/>
            </ScrollView>
        </View>
    )
}
function CommunityContentBox(){
    return (
        <View style={{width:350, height: 80, backgroundColor:'red', marginRight:10, padding:5,}}>
            <View style={{height:40, width:"100%", paddingLeft:10, justifyContent:"center", borderBottomWidth:1, flexDirection:"row",}}>
                
                <View style={{flex:1, borderRightWidth:1}}></View>
                <View style={{flex:5, justifyContent:'center'}}>
                    <Text>r/Community</Text>
                    <Text>206K Followers</Text>
                </View>
                <View style={{flex:2, borderLeftWidth:1,}}>
                    <TouchableOpacity />
                </View>
            
            </View>

            <View></View>
        </View>
    )
}

styles = StyleSheet.create({
    container:{
        paddingTop:StatusBar.currentHeight,
        flex: 1,
        alignItems: "center",
    },
    header:{
        width:"100%",
        height: 70,
        flexDirection:"row",
    }
})