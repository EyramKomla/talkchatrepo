import { StyleSheet, Text, View, Button, Dimensions,ScrollView, CheckBox, Image} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

function LoginOptions({text, icon}){
    return (
        <View style={{
            width: "90%",
            height: 35,
            borderRadius: 20,
            borderWidth:1,
            flexDirection: "row",
        }}>
            <View style={{
                flex:1, 
                justifyContent:"center",
                alignItems:"center",}}>
                
                <Ionicons name={icon} size={28}/>
            </View>
            <View style={{
                flex:4,
                borderTopRightRadius: 35,
                borderBottomRightRadius: 35,
                justifyContent:"center",
                paddingLeft: 40}}>
                    <Text style={{fontWeight:"bold", fontSize: 15}}>{text}</Text>
            </View>
        </View>
    )
}

export default function LoginScreen(){
    return (
        <View style={styles.loginContainer}>
            <Image source={require('../assets/talkchat-logo.jpg')} style={{width:200, height: 200}}/>

            <View style={{width:"100%", height:60, alignItems:'center'}}>
                <Text style={{fontSize:28, fontWeight:"600", color:"purple"}}>Welcome Back!</Text>
            </View>

            <View style={{gap:10}}>
                <LoginOptions text="Continue with Google" icon="logo-google"/>
                <LoginOptions text="Use e-mail or username" icon="person-outline"/>
            </View>

            <View style={{
                width:"100%",
                alignItems:"center",
                alignSelf:"flex",
                borderBottomWidth: 1,}}>
                <Text>By continuing, you agree to our <Text style={{fontWeight:"bold"}}>User Agreement</Text> and ackownledge that you understand the <Text style={{fontWeight:"bold"}}>Privacy Policy</Text></Text>
               
                <View style={{
                    flexDirection:"row",
                    alignItems: "center"
                }}>
        
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer:{
        flex:1,
        backgroundColor:"rgb(241, 242, 244)",
        paddingTop: 100,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: "space-between",
    }
})